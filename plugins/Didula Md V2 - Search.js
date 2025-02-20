
// search.js - All Search Category Commands

const { cmd, commands } = require('../lib/command');
const config = require('../settings');
const axios = require('axios');
const g_i_s = require('g-i-s');
const cheerio = require('cheerio');
const yts = require('yt-search'); // Make sure to import the yts library


cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "search",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `     🔍_*DIDULA-MD-V2 GIT STALK*_🔎
        
👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

> *ᴩʀᴏᴊᴇᴄᴛꜱ ᴏꜰ ᴅɪᴅᴜʟᴀ ʀᴀꜱʜᴍɪᴋᴀ*
`;

         // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: userInfo,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆',
          newsletterJid: "",
          },
          externalAdReply: {
              title: `Didula-MD-V2 Github Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: data.avatar_url,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`єяяσя ƒєт¢нιηg ∂αтα: ${e.response ? e.response.data.message : e.message}`);
    }
});





cmd({
    pattern: "ipinfo",
    desc: "Get information about an IP address",
    use: ".ipinfo <IP_address>",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("⛔ Please provide an IP address!");

        const apiUrl = `https://BJ-Devs.serv00.net/Ip-Info.php?ip=${q}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        // Format the response message
        let resultMessage = `🔍 *IP Information:*\n\n`;
        resultMessage += `🌐 IP: ${data.ip}\n`;
        resultMessage += `🌍 Continent: ${data.continent_name} (${data.continent_code})\n`;
        resultMessage += `🇨🇳 Country: ${data.country_name} (${data.country_code2})\n`;
        resultMessage += `🏙️ City: ${data.city}\n`;
        resultMessage += `📍 State/Province: ${data.state_prov}\n`;
        resultMessage += `📮 Zip Code: ${data.zipcode}\n`;
        resultMessage += `📏 Latitude: ${data.latitude}\n`;
        resultMessage += `📏 Longitude: ${data.longitude}\n`;
        resultMessage += `📞 Calling Code: ${data.calling_code}\n`;
        resultMessage += `🕒 Time Zone: ${data.time_zone.name}\n`;
        resultMessage += `💻 ISP: ${data.isp}\n`;
        resultMessage += `🏳️ Country Flag: ${data.country_flag}\n`;

        // Send the response back
        reply(resultMessage);
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
            reply(`Error: ${error.response.data.message}`);
        } else {
            reply('An error occurred while fetching IP information. Please try again later.');
        }
    }
});







cmd({
    pattern: "yts",
    desc: "Search YouTube videos",
    use: ".yts <query>",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('⛔ Please provide a search query!');
        
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5); // Get the top 5 results
        
        if (videos.length === 0) {
            return reply('No results found.');
        }
        
        let resultMessage = '🎥 *YouTube Search Results:*\n\n';
        videos.forEach((video, index) => {
            resultMessage += `${index + 1}. [${video.title}](${video.url}) - ${video.author.name}\n`;
        });
        
        reply(resultMessage);
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});






// Image Search Command
cmd({
    pattern: "img",
    alias: ["googleimg"],
    react: "🔍",
    desc: "Search for images on Google",
    category: "search",
    use: '.imgsearch <query>',
    filename: __filename
},
async(conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search query!");

        g_i_s(q, (error, result) => {
            if (error || !result.length) return reply("No images found!");

            // Send the first 5 images
            const imageUrls = result.slice(0, 5).map(img => img.url);
            imageUrls.forEach(async (url) => {
                await conn.sendMessage(from, { image: { url } }, { quoted: mek });
            });
        });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});

// Web Search Function (if needed)
cmd({
    pattern: "search",
    alias: ["websearch"],
    react: "🌐",
    desc: "Search the web for information",
    category: "search",
    use: '.search <query>',
    filename: __filename
},
async(conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search query!");

        // Using the search_web function
        const searchResults = await search_web(q);
        await reply(searchResults);

    } catch (error) {
        console.error(error);
        reply('An error occurred while searching. Please try again later.');
    }
});


// Group JIDs Search

// Get Profile Picture Command
cmd({
    pattern: "getpic",
    desc: "Get the group profile picture.",
    category: "search",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')

        const groupPic = await conn.getProfilePicture(from)
        await conn.sendMessage(from, { 
            image: { url: groupPic }, 
            caption: 'Group Profile Picture' 
        })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});


cmd({
    pattern: "vv",
    alias: ['retrive', "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("> *This is not a ViewOnce message.*");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});


module.exports = {
    // Export any necessary functions or variables
};