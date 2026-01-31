import { Telegraf, Markup } from 'telegraf';
import { readFile, writeFile, copyFile } from 'fs/promises';
import { existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Telegram bot configuration
const BOT_TOKEN = '8574352136:AAHmWaljcU99Uhu2qAKMigUbsbS7vLnJjNo';
const ADMIN_CHAT_ID = '6357527757';

// Path to your constants file
const CONSTANTS_FILE = join(__dirname, 'constants.tsx');

// Initialize bot
const bot = new Telegraf(BOT_TOKEN);

console.log('💈 Sheri Salon Admin Bot');
console.log('══════════════════════════');

// Check if file exists
if (!existsSync(CONSTANTS_FILE)) {
  console.error('❌ ERROR: constants.tsx not found!');
  console.log('Files in this folder:');
  readdirSync(__dirname).forEach(file => console.log(`  - ${file}`));
  process.exit(1);
}

console.log('✅ Found constants.tsx');
console.log('🤖 Bot starting...\n');

// Store user state
const userState = {};

// ========== MAIN MENU KEYBOARDS ==========
const mainMenu = Markup.keyboard([
  ['💰 View Prices', '✏️ Update Price'],
  ['📅 All Bookings', "📅 Today's"],
  ['🔍 Search Bookings', '📊 Stats'],
  ['🆘 Help']
]).resize();

const bookingMenu = Markup.keyboard([
  ['📋 View All', '📅 Today Only'],
  ['⏰ By Time', '💈 By Service'],
  ['📊 Stats', '🔙 Main Menu']
]).resize();

const searchMenu = Markup.keyboard([
  ['👤 By Name', '📱 By Phone'],
  ['📧 By Email', '💈 By Service'],
  ['📅 By Date', '🔙 Main Menu']
]).resize();

// ========== PRICE FUNCTIONS ==========
async function getAllServices() {
  try {
    const content = await readFile(CONSTANTS_FILE, 'utf-8');
    const services = [];
    
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes("id: '") && line.includes('price: "')) {
        const idMatch = line.match(/id:\s*'([^']+)'/);
        const titleMatch = line.match(/title:\s*"([^"]+)"/);
        const priceMatch = line.match(/price:\s*"([^"]+)"/);
        
        if (idMatch && priceMatch) {
          services.push({
            id: idMatch[1],
            title: titleMatch ? titleMatch[1] : `Service ${idMatch[1]}`,
            price: priceMatch[1]
          });
        }
      }
    }
    
    return services;
  } catch (error) {
    console.error('Error reading file:', error.message);
    return [];
  }
}

async function updatePriceOnly(serviceId, newPriceNumber) {
  try {
    let content = await readFile(CONSTANTS_FILE, 'utf-8');
    
    console.log(`🔄 Updating service: ${serviceId}`);
    
    const lines = content.split('\n');
    let serviceFound = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(`id: '${serviceId}'`)) {
        for (let j = i; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j].includes('price: "')) {
            const oldLine = lines[j];
            const priceMatch = oldLine.match(/price:\s*"([^"]+)"/);
            
            if (priceMatch) {
              const oldPrice = priceMatch[1];
              let newPrice = oldPrice;
              
              if (oldPrice.includes('+')) {
                newPrice = `$${newPriceNumber}+`;
              } else if (oldPrice.includes('/')) {
                const parts = oldPrice.split('/');
                newPrice = `$${newPriceNumber}/${parts[1]}`;
              } else {
                newPrice = `$${newPriceNumber}`;
              }
              
              const newLine = oldLine.replace(/price:\s*"[^"]+"/, `price: "${newPrice}"`);
              lines[j] = newLine;
              serviceFound = true;
              
              // Create backup
              const backupFile = CONSTANTS_FILE + '.backup';
              if (!existsSync(backupFile)) {
                await copyFile(CONSTANTS_FILE, backupFile);
                console.log('💾 Created backup file');
              }
              
              break;
            }
          }
        }
        break;
      }
    }
    
    if (!serviceFound) {
      return { success: false, error: 'Service not found' };
    }
    
    await writeFile(CONSTANTS_FILE, lines.join('\n'), 'utf-8');
    console.log('✅ Price updated');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Update error:', error.message);
    return { success: false, error: error.message };
  }
}

function extractPriceNumber(input) {
  const cleaned = input.replace(/[^\d.]/g, '');
  const number = parseFloat(cleaned);
  
  if (isNaN(number)) return null;
  
  if (number % 1 === 0) {
    return number.toString();
  } else {
    return number.toFixed(2);
  }
}

// ========== ENHANCED BOOKING FUNCTIONS ==========
const BOOKING_API = 'https://sheetdb.io/api/v1/rh6rirv4r1pa0';

async function fetchBookings() {
  try {
    console.log('📡 Fetching bookings...');
    const response = await fetch(BOOKING_API);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const bookings = await response.json();
    console.log(`✅ Fetched ${bookings.length} bookings`);
    return bookings;
  } catch (error) {
    console.error('Failed to fetch bookings:', error.message);
    return [];
  }
}

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr) return 'No date';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// Format time nicely
function formatTime(timeStr) {
  if (!timeStr) return 'No time';
  // If time is already in AM/PM format, return as is
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  
  // Try to parse and format
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes || '00'} ${ampm}`;
  } catch {
    return timeStr;
  }
}

// Get detailed booking info
function formatBookingDetails(booking, index = null) {
  let details = '';
  if (index !== null) details += `${index}. `;
  
  // Name and contact
  if (booking.Name) details += `👤 *${booking.Name}*\n`;
  if (booking.Phone) details += `📱 ${booking.Phone}\n`;
  if (booking.Email) details += `📧 ${booking.Email}\n`;
  
  // Service and date/time
  if (booking.Service) details += `💈 ${booking.Service}\n`;
  if (booking.Date) details += `📅 ${formatDate(booking.Date)}\n`;
  if (booking.Time) details += `⏰ ${formatTime(booking.Time)}\n`;
  
  // Status and notes
  if (booking.Status) details += `📊 Status: ${booking.Status}\n`;
  if (booking.Notes) details += `📝 Notes: ${booking.Notes}\n`;
  
  // Duration if available
  if (booking.Duration) details += `⏱️ Duration: ${booking.Duration}\n`;
  
  // Add any other fields (exclude common ones)
  const commonFields = ['Name', 'Phone', 'Email', 'Service', 'Date', 'Time', 'Status', 'Notes', 'Duration'];
  Object.keys(booking).forEach(key => {
    if (!commonFields.includes(key) && booking[key]) {
      details += `• ${key}: ${booking[key]}\n`;
    }
  });
  
  return details.trim();
}

// Get booking statistics
function getBookingStats(bookings) {
  if (!bookings || bookings.length === 0) {
    return { 
      total: 0, 
      today: 0, 
      upcoming: 0,
      byService: {},
      byStatus: {},
      byDay: {}
    };
  }
  
  const today = new Date().toISOString().split('T')[0];
  const stats = { 
    total: bookings.length, 
    today: 0, 
    upcoming: 0,
    byService: {},
    byStatus: {},
    byDay: {},
    recent: []
  };
  
  // Sort by date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = a.Date ? new Date(a.Date).getTime() : 0;
    const dateB = b.Date ? new Date(b.Date).getTime() : 0;
    return dateB - dateA;
  });
  
  stats.recent = sortedBookings.slice(0, 5);
  
  sortedBookings.forEach(booking => {
    // Count by service
    const service = booking.Service || 'Unknown';
    stats.byService[service] = (stats.byService[service] || 0) + 1;
    
    // Count by status
    const status = booking.Status || 'Unknown';
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
    
    // Count by day of week
    if (booking.Date) {
      try {
        const date = new Date(booking.Date);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        stats.byDay[day] = (stats.byDay[day] || 0) + 1;
      } catch (e) {
        // Ignore date parsing errors
      }
    }
    
    // Count today and upcoming
    if (booking.Date) {
      const bookingDate = booking.Date.split('T')[0];
      if (bookingDate === today) stats.today++;
      if (bookingDate >= today) stats.upcoming++;
    }
  });
  
  return stats;
}

// Filter bookings by criteria
function filterBookings(bookings, filterType, filterValue) {
  if (!bookings || bookings.length === 0) return [];
  
  switch(filterType) {
    case 'today':
      const today = new Date().toISOString().split('T')[0];
      return bookings.filter(b => b.Date && b.Date.includes(today));
      
    case 'service':
      return bookings.filter(b => 
        b.Service && b.Service.toLowerCase().includes(filterValue.toLowerCase())
      );
      
    case 'name':
      return bookings.filter(b => 
        b.Name && b.Name.toLowerCase().includes(filterValue.toLowerCase())
      );
      
    case 'phone':
      return bookings.filter(b => 
        b.Phone && b.Phone.includes(filterValue)
      );
      
    case 'email':
      return bookings.filter(b => 
        b.Email && b.Email.toLowerCase().includes(filterValue.toLowerCase())
      );
      
    case 'date':
      return bookings.filter(b => 
        b.Date && b.Date.includes(filterValue)
      );
      
    case 'status':
      return bookings.filter(b => 
        b.Status && b.Status.toLowerCase().includes(filterValue.toLowerCase())
      );
      
    default:
      return bookings;
  }
}

// Group bookings by time (morning, afternoon, evening)
function groupByTime(bookings) {
  const groups = {
    'Morning (8AM-12PM)': [],
    'Afternoon (12PM-5PM)': [],
    'Evening (5PM-9PM)': []
  };
  
  bookings.forEach(booking => {
    if (!booking.Time) return;
    
    const timeStr = booking.Time.toUpperCase();
    let hour = 0;
    
    // Extract hour from time string
    if (timeStr.includes('AM')) {
      hour = parseInt(timeStr) || 0;
      if (timeStr.includes('12')) hour = 0; // 12AM = 0
    } else if (timeStr.includes('PM')) {
      hour = (parseInt(timeStr) || 0) + 12;
      if (timeStr.includes('12')) hour = 12; // 12PM = 12
    } else {
      // 24-hour format
      hour = parseInt(timeStr.split(':')[0]) || 0;
    }
    
    if (hour >= 8 && hour < 12) {
      groups['Morning (8AM-12PM)'].push(booking);
    } else if (hour >= 12 && hour < 17) {
      groups['Afternoon (12PM-5PM)'].push(booking);
    } else if (hour >= 17 && hour < 21) {
      groups['Evening (5PM-9PM)'].push(booking);
    }
  });
  
  return groups;
}

// ========== BOT COMMANDS ==========

// Start command with menu
bot.start(async (ctx) => {
  const chatId = ctx.chat.id.toString();
  
  if (chatId !== ADMIN_CHAT_ID) {
    return ctx.reply('🔒 Private bot. Access denied.');
  }
  
  await ctx.reply(
    `👋 Welcome to *Sheri Salon Admin*\n\n` +
    `*📊 Quick Stats:*\n` +
    `Fetching latest data...`,
    { parse_mode: 'Markdown', ...mainMenu }
  );
  
  // Show quick stats
  try {
    const bookings = await fetchBookings();
    const services = await getAllServices();
    const stats = getBookingStats(bookings);
    
    await ctx.reply(
      `📊 *QUICK OVERVIEW*\n\n` +
      `💰 Services: ${services.length}\n` +
      `📅 Total Bookings: ${stats.total}\n` +
      `📌 Today: ${stats.today} appointments\n` +
      `📈 Upcoming: ${stats.upcoming}\n\n` +
      `Use the menu buttons below to manage everything!`,
      { parse_mode: 'Markdown', ...mainMenu }
    );
  } catch (error) {
    await ctx.reply(
      `✅ Bot started!\n\n` +
      `Use the menu buttons below:`,
      { parse_mode: 'Markdown', ...mainMenu }
    );
  }
});

// ========== PRICE MANAGEMENT ==========
bot.hears('💰 View Prices', async (ctx) => {
  await ctx.sendChatAction('typing');
  
  const services = await getAllServices();
  
  if (services.length === 0) {
    return ctx.reply('No services found.', mainMenu);
  }
  
  let message = '💰 *SERVICE PRICES*\n\n';
  
  // Group by first letter
  const groups = {};
  services.forEach(s => {
    const group = s.id.charAt(0).toUpperCase();
    if (!groups[group]) groups[group] = [];
    groups[group].push(s);
  });
  
  Object.keys(groups).sort().forEach(group => {
    message += `*${group} SERVICES*\n`;
    groups[group].forEach(s => {
      message += `• \`${s.id}\` - ${s.title}\n`;
      message += `  💰 ${s.price}\n\n`;
    });
  });
  
  message += '━━━━━━━━━━━━━━\n';
  message += 'To update: Type the *Service ID* (like b1, h1, t1)';
  
  await ctx.reply(message, { parse_mode: 'Markdown', ...mainMenu });
});

bot.hears('✏️ Update Price', async (ctx) => {
  await ctx.reply(
    `✏️ *UPDATE PRICE*\n\n` +
    `Please type the *Service ID* you want to update.\n\n` +
    `*Examples:*\n` +
    `• \`b1\` (Botox 20 Units)\n` +
    `• \`h1\` (Women's Haircut)\n` +
    `• \`t1\` (Eyebrow Threading)\n\n` +
    `Type the ID now:`,
    { parse_mode: 'Markdown', ...mainMenu }
  );
  
  userState[ctx.chat.id] = { step: 'waiting_for_id' };
});

// ========== ENHANCED BOOKING MANAGEMENT ==========
bot.hears('📅 All Bookings', async (ctx) => {
  await ctx.reply(
    `📅 *BOOKING MANAGEMENT*\n\n` +
    `Choose how you want to view bookings:`,
    { parse_mode: 'Markdown', ...bookingMenu }
  );
});

bot.hears("📅 Today's", async (ctx) => {
  await ctx.sendChatAction('typing');
  
  try {
    const bookings = await fetchBookings();
    const today = new Date().toISOString().split('T')[0];
    
    const todayBookings = filterBookings(bookings, 'today', '');
    
    if (todayBookings.length === 0) {
      return ctx.reply(
        `📅 *TODAY'S SCHEDULE*\n\n` +
        `No appointments scheduled for today.\n` +
        `Date: ${formatDate(today)}`,
        { parse_mode: 'Markdown', ...mainMenu }
      );
    }
    
    // Group by time
    const timeGroups = groupByTime(todayBookings);
    
    let message = `📅 *TODAY'S SCHEDULE*\n\n`;
    message += `Date: ${formatDate(today)}\n`;
    message += `Total: ${todayBookings.length} appointments\n\n`;
    
    Object.keys(timeGroups).forEach(timeSlot => {
      if (timeGroups[timeSlot].length > 0) {
        message += `*${timeSlot}*\n`;
        timeGroups[timeSlot].forEach((booking, index) => {
          message += `${index + 1}. ${booking.Name || 'No name'}`;
          if (booking.Time) message += ` (${formatTime(booking.Time)})`;
          if (booking.Service) message += ` - ${booking.Service}`;
          message += '\n';
        });
        message += '\n';
      }
    });
    
    await ctx.reply(message, { parse_mode: 'Markdown', ...bookingMenu });
    
  } catch (error) {
    await ctx.reply(`❌ Error: ${error.message}`, mainMenu);
  }
});

bot.hears('📋 View All', async (ctx) => {
  await ctx.sendChatAction('typing');
  
  try {
    const bookings = await fetchBookings();
    
    if (bookings.length === 0) {
      return ctx.reply('No bookings found in the database.', bookingMenu);
    }
    
    // Sort by date (newest first)
    const sortedBookings = [...bookings].sort((a, b) => {
      const dateA = a.Date ? new Date(a.Date).getTime() : 0;
      const dateB = b.Date ? new Date(b.Date).getTime() : 0;
      return dateB - dateA;
    });
    
    let message = `📋 *ALL BOOKINGS*\n\n`;
    message += `Total: ${bookings.length} bookings\n\n`;
    
    // Show first 5 with details
    sortedBookings.slice(0, 5).forEach((booking, index) => {
      message += `${index + 1}. *${booking.Name || 'No name'}*\n`;
      if (booking.Service) message += `   Service: ${booking.Service}\n`;
      if (booking.Date) message += `   Date: ${formatDate(booking.Date)}\n`;
      if (booking.Time) message += `   Time: ${formatTime(booking.Time)}\n`;
      if (booking.Status) message += `   Status: ${booking.Status}\n`;
      message += '\n';
    });
    
    if (bookings.length > 5) {
      message += `...and ${bookings.length - 5} more bookings\n\n`;
    }
    
    message += `Use search options to find specific bookings.`;
    
    await ctx.reply(message, { parse_mode: 'Markdown', ...bookingMenu });
    
  } catch (error) {
    await ctx.reply(`❌ Error: ${error.message}`, mainMenu);
  }
});

bot.hears('⏰ By Time', async (ctx) => {
  await ctx.sendChatAction('typing');
  
  try {
    const bookings = await fetchBookings();
    const timeGroups = groupByTime(bookings);
    
    let message = `⏰ *BOOKINGS BY TIME SLOT*\n\n`;
    
    Object.keys(timeGroups).forEach(timeSlot => {
      message += `*${timeSlot}*\n`;
      message += `Appointments: ${timeGroups[timeSlot].length}\n`;
      
      if (timeGroups[timeSlot].length > 0) {
        timeGroups[timeSlot].slice(0, 3).forEach(booking => {
          message += `• ${booking.Name || 'No name'}`;
          if (booking.Time) message += ` (${formatTime(booking.Time)})`;
          message += '\n';
        });
        if (timeGroups[timeSlot].length > 3) {
          message += `...and ${timeGroups[timeSlot].length - 3} more\n`;
        }
      } else {
        message += `No appointments\n`;
      }
      message += '\n';
    });
    
    await ctx.reply(message, { parse_mode: 'Markdown', ...bookingMenu });
    
  } catch (error) {
    await ctx.reply(`❌ Error: ${error.message}`, mainMenu);
  }
});

bot.hears('💈 By Service', async (ctx) => {
  await ctx.reply(
    `💈 *SEARCH BY SERVICE*\n\n` +
    `Type the service name you want to search for:\n\n` +
    `*Examples:*\n` +
    `• hair\n` +
    `• botox\n` +
    `• threading\n` +
    `• waxing\n\n` +
    `Type the service name now:`,
    { parse_mode: 'Markdown', ...bookingMenu }
  );
  
  userState[ctx.chat.id] = { step: 'search_service' };
});

bot.hears('🔍 Search Bookings', async (ctx) => {
  await ctx.reply(
    `🔍 *SEARCH BOOKINGS*\n\n` +
    `Choose how you want to search:`,
    { parse_mode: 'Markdown', ...searchMenu }
  );
});

// Search options
bot.hears('👤 By Name', async (ctx) => {
  await ctx.reply(
    `👤 *SEARCH BY NAME*\n\n` +
    `Type the name you want to search for:\n\n` +
    `*Examples:*\n` +
    `• john\n` +
    `• smith\n` +
    `• maria\n\n` +
    `Type the name now:`,
    { parse_mode: 'Markdown', ...searchMenu }
  );
  
  userState[ctx.chat.id] = { step: 'search_name' };
});

bot.hears('📱 By Phone', async (ctx) => {
  await ctx.reply(
    `📱 *SEARCH BY PHONE*\n\n` +
    `Type the phone number (or part of it):\n\n` +
    `*Examples:*\n` +
    `• 214\n` +
    `• 469\n` +
    `• 555\n\n` +
    `Type the phone number now:`,
    { parse_mode: 'Markdown', ...searchMenu }
  );
  
  userState[ctx.chat.id] = { step: 'search_phone' };
});

bot.hears('📅 By Date', async (ctx) => {
  await ctx.reply(
    `📅 *SEARCH BY DATE*\n\n` +
    `Type the date (YYYY-MM-DD format):\n\n` +
    `*Examples:*\n` +
    `• 2024-02-01\n` +
    `• 2024-02-15\n` +
    `• 2024-03-01\n\n` +
    `Type the date now:`,
    { parse_mode: 'Markdown', ...searchMenu }
  );
  
  userState[ctx.chat.id] = { step: 'search_date' };
});

bot.hears('📊 Stats', async (ctx) => {
  await ctx.sendChatAction('typing');
  
  try {
    const bookings = await fetchBookings();
    const stats = getBookingStats(bookings);
    
    let message = `📊 *BOOKING STATISTICS*\n\n`;
    message += `📈 Total Bookings: ${stats.total}\n`;
    message += `📅 Today: ${stats.today}\n`;
    message += `📈 Upcoming: ${stats.upcoming}\n\n`;
    
    if (Object.keys(stats.byService).length > 0) {
      message += `*POPULAR SERVICES:*\n`;
      // Get top 5 services
      const topServices = Object.entries(stats.byService)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      topServices.forEach(([service, count]) => {
        const percentage = Math.round((count / stats.total) * 100);
        message += `• ${service}: ${count} (${percentage}%)\n`;
      });
      message += '\n';
    }
    
    if (Object.keys(stats.byDay).length > 0) {
      message += `*BUSIEST DAYS:*\n`;
      const sortedDays = Object.entries(stats.byDay)
        .sort((a, b) => b[1] - a[1]);
      
      sortedDays.forEach(([day, count]) => {
        message += `• ${day}: ${count}\n`;
      });
    }
    
    // Recent bookings
    if (stats.recent.length > 0) {
      message += `\n*RECENT BOOKINGS:*\n`;
      stats.recent.forEach((booking, index) => {
        message += `${index + 1}. ${booking.Name || 'No name'}`;
        if (booking.Date) message += ` (${formatDate(booking.Date)})`;
        message += '\n';
      });
    }
    
    await ctx.reply(message, { parse_mode: 'Markdown', ...bookingMenu });
    
  } catch (error) {
    await ctx.reply(`❌ Error: ${error.message}`, mainMenu);
  }
});

bot.hears('🔙 Main Menu', async (ctx) => {
  await ctx.reply(
    `Returning to main menu...`,
    mainMenu
  );
});

// ========== SEARCH HANDLING ==========
bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const text = ctx.message.text.trim();
  
  if (chatId !== ADMIN_CHAT_ID) return;
  if (text.startsWith('/')) return; // Skip commands
  
  const state = userState[chatId] || {};
  
  // Handle search queries
  if (state.step && state.step.startsWith('search_')) {
    const searchType = state.step.replace('search_', '');
    await ctx.sendChatAction('typing');
    
    try {
      const bookings = await fetchBookings();
      const results = filterBookings(bookings, searchType, text);
      
      if (results.length === 0) {
        await ctx.reply(
          `❌ No bookings found for "${text}"\n\n` +
          `Try a different search term.`,
          searchType === 'service' ? bookingMenu : searchMenu
        );
        delete userState[chatId];
        return;
      }
      
      let message = `🔍 *SEARCH RESULTS*\n\n`;
      message += `Search: "${text}"\n`;
      message += `Found: ${results.length} booking(s)\n\n`;
      
      // Show results with details
      results.slice(0, 5).forEach((booking, index) => {
        message += `${index + 1}. *${booking.Name || 'No name'}*\n`;
        if (booking.Service) message += `   Service: ${booking.Service}\n`;
        if (booking.Date) message += `   Date: ${formatDate(booking.Date)}\n`;
        if (booking.Time) message += `   Time: ${formatTime(booking.Time)}\n`;
        if (booking.Phone) message += `   Phone: ${booking.Phone}\n`;
        message += '\n';
      });
      
      if (results.length > 5) {
        message += `...and ${results.length - 5} more\n`;
      }
      
      await ctx.reply(message, { 
        parse_mode: 'Markdown', 
        ...(searchType === 'service' ? bookingMenu : searchMenu)
      });
      
      delete userState[chatId];
      
    } catch (error) {
      await ctx.reply(`❌ Search error: ${error.message}`, mainMenu);
      delete userState[chatId];
    }
  }
  
  // Price update flow (keep existing code)
  else if (state.step === 'waiting_for_id') {
    // ... existing price update code ...
  } else if (state.step === 'waiting_for_price') {
    // ... existing price update code ...
  } else if (state.step === 'waiting_for_confirmation') {
    // ... existing price update code ...
  } 
  // Quick service ID input
  else if (/^[a-z]+\d+$/i.test(text) && text.length <= 4) {
    // ... existing service ID handling ...
  }
});

// ========== HELP ==========
bot.hears('🆘 Help', async (ctx) => {
  const help = 
    `🛠️ *HELP - Sheri Salon Admin*\n\n` +
    `*💰 PRICE MANAGEMENT:*\n` +
    `• Click "💰 View Prices" to see all services\n` +
    `• Click "✏️ Update Price" to change a price\n` +
    `• Or type: \`/edit b1 199.99\`\n\n` +
    `*📅 BOOKING MANAGEMENT:*\n` +
    `• "📅 All Bookings" - Full booking menu\n` +
    `• "📅 Today's" - Today's schedule\n` +
    `• "🔍 Search" - Advanced search options\n` +
    `• "📊 Stats" - Statistics overview\n\n` +
    `*📊 DATA FEATURES:*\n` +
    `• View by time slots (Morning/Afternoon/Evening)\n` +
    `• Search by name, phone, email, service, date\n` +
    `• Group bookings by service type\n` +
    `• See busiest days and popular services\n\n` +
    `*💡 TIPS:*\n` +
    `• Just click buttons - no typing needed!\n` +
    `• Use search to quickly find specific bookings\n` +
    `• Check stats to see business trends`;
  
  await ctx.reply(help, { parse_mode: 'Markdown', ...mainMenu });
});

// Quick commands
bot.command('edit', async (ctx) => {
  const args = ctx.message.text.split(' ').slice(1);
  
  if (args.length < 2) {
    return ctx.reply(
      'Usage: `/edit [ID] [NUMBER]`\n\n' +
      'Examples:\n' +
      '`/edit b1 199.99`\n' +
      '`/edit h1 75`\n' +
      '`/edit t1 18`',
      mainMenu
    );
  }
  
  const serviceId = args[0].toLowerCase();
  const priceInput = args.slice(1).join(' ');
  const priceNumber = extractPriceNumber(priceInput);
  
  if (!priceNumber) {
    return ctx.reply(`❌ Invalid price: "${priceInput}"`, mainMenu);
  }
  
  const services = await getAllServices();
  const service = services.find(s => s.id === serviceId);
  
  if (!service) {
    return ctx.reply(`❌ Service ID "${serviceId}" not found.`, mainMenu);
  }
  
  const result = await updatePriceOnly(serviceId, priceNumber);
  
  if (result.success) {
    ctx.reply(`✅ Updated \`${serviceId}\` to $${priceNumber}`, mainMenu);
  } else {
    ctx.reply(`❌ Failed: ${result.error}`, mainMenu);
  }
});

bot.command('today', async (ctx) => {
  try {
    const bookings = await fetchBookings();
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    const todayBookings = filterBookings(bookings, 'today', '');
    
    if (todayBookings.length === 0) {
      return ctx.reply(`📅 No appointments for ${today}.`, mainMenu);
    }
    
    let message = `📅 *APPOINTMENTS FOR ${today.toUpperCase()}*\n\n`;
    todayBookings.forEach((booking, index) => {
      message += `${index + 1}. ${booking.Name || 'No name'}`;
      if (booking.Time) message += ` at ${formatTime(booking.Time)}`;
      if (booking.Service) message += ` - ${booking.Service}`;
      if (booking.Phone) message += ` (${booking.Phone})`;
      message += '\n';
    });
    
    ctx.reply(message, { parse_mode: 'Markdown', ...mainMenu });
    
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}`, mainMenu);
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  if (ctx && ctx.reply) {
    ctx.reply('❌ An error occurred.', mainMenu);
  }
});

// Start the bot
async function startBot() {
  try {
    console.log('🔍 Initializing...');
    const services = await getAllServices();
    console.log(`✅ Found ${services.length} services`);
    
    console.log('🚀 Starting bot...');
    await bot.launch();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ BOT IS RUNNING!');
    console.log('='.repeat(50));
    console.log('\n📱 *FEATURES:*');
    console.log('• 💰 Price management with menu buttons');
    console.log('• 📅 Enhanced booking views');
    console.log('• 🔍 Advanced search options');
    console.log('• 📊 Statistics and analytics');
    console.log('• ⏰ Time slot grouping');
    console.log('\n💡 *TIPS:* Just click buttons - no typing needed!');
    console.log('\n' + '='.repeat(50));
    
  } catch (error) {
    console.error('❌ Failed to start:', error.message);
    process.exit(1);
  }
}

// Clean shutdown
process.once('SIGINT', () => {
  console.log('\n👋 Stopping bot...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('\n👋 Stopping bot...');
  bot.stop('SIGTERM');
  process.exit(0);
});

// Start!
startBot();