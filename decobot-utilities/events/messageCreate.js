const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../info');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./bot.sqlite');

module.exports = {
	name: 'messageCreate',
	execute(message) {
        const client = message.client
        const user = message.author.user
        const member = message.author
        const guild = message.guild
        var logsID = '683458185763225617'
        var boostID = '229690400816889856'
        client.getUsSett = sql.prepare("SELECT * FROM userSettings WHERE userID = ?");
        client.setUsSett = sql.prepare("INSERT OR REPLACE INTO userSettings (userID, userAccess, language) VALUES (@userID, @userAccess, @language);");
        let userset = client.getUsSett.get(message.author.id)

        if(message.channel.id === '875652753924448306') {
            if(message.author.id === '835394949612175380') {
                const embed = new EmbedBuilder()
                    .setTitle('New Message from Lockyz Dev')
                    .setDescription(message.cleanContent)
                client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
            }
        }

        if(!userset) {
            userset = { userID: message.author.id, userAccess: 'false', language: 'en' };
            client.setUsSett.run(userset);
        }

        if(message.guild.id === "229690400816889856") {
            if(message.type === "USER_PREMIUM_GUILD_SUBSCRIPTION") {
                const embed = new EmbedBuilder()
                    .setColor('#FF00B2')
                    .setAuthor(`BOOST`, message.guild.iconURL())
                    .setDescription('Thanks for Boosting')
                client.channels.cache.get(boostID).send({ content: message.author, embeds: [embed] });
            }
            if(message.type === "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1") {
                const embed = new EmbedBuilder()
                    .setColor('#FF00B2')
                    .setAuthor(`BOOST LEVEL 1`, message.guild.iconURL())
                    .setDescription('Thanks for Boosting and getting us to Level One')
                client.channels.cache.get(boostID).send({ content: message.author, embeds: [embed] });
            }
              if(message.type === "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2") {
                const embed = new EmbedBuilder()
                    .setColor('#FF00B2')
                    .setAuthor(`BOOST LEVEL 2`, message.guild.iconURL())
                    .setDescription('Thanks for Boosting and getting us to Level Two')
                client.channels.cache.get(boostID).send({ content: message.author, embeds: [embed] });
              }
              if(message.type === "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3") {
                const embed = new EmbedBuilder()
                    .setColor('#FF00B2')
                    .setAuthor(`BOOST LEVEL 3`, message.guild.iconURL())
                    .setDescription('Thanks for Boosting and getting us to Level Three')
                client.channels.cache.get(boostID).send({ content: message.author, embeds: [embed] });
            }
        
            if(message.type === 'GUILD_MEMBER_JOIN') {
                const embed = new EmbedBuilder()
                    .setAuthor("Member Verified | "+message.member.user.username, message.member.user.avatarURL())
                    .setColor(embedColor)
                    .setTimestamp()
                    .setFooter('User ID '+ message.member.id)
                    .setTimestamp();
                client.channels.cache.get(botIDs.logs).send({ embeds: [embed] });
            }
        }
        
        if (!message.guild) return;

        if(message.author.bot) return;
        const update = ["1.13", "1.14", "1.15", "1.17", "1.18", "1.19"];
        if( update.some(word => message.content.includes(word)) ) {
            if (message.member.roles.cache.has('233739812761370624') || message.member.roles.cache.has('233739690870571008') || message.member.roles.cache.has('233739812761370624') || message.channel.parent.id === "424667177241673729" || message.channel.parent.id === "433404487865073665" || message.channel.parent.id === "613357718987603987" || message.channel.parent.id === "643264150994419713")
            {
                return;
            } else {
		        try {
			        const statsEmbed = new EmbedBuilder()
                        .setColor(embedColor)
                        .setDescription(`Please don\'t ask for backports/updates to other Minecraft versions.\nA 1.16 version of decocraft is currently in alpha and new builds will be released every now and then.\n\nI am a bot performing an automated action, if this message shows up in error please contact the developers of this bot within our discord server. [Direct Link to our Discord](https://discord.gg/NgpN3YYbMM)`)
                        .setTimestamp();
                    message.reply({embeds: [statsEmbed]});
		        } catch (e) {
			        message.channel.send('An error occured\n'+e)
			        return;
		        }
	        }
        }

        const decobench = ["decobench", "crafting"];
        if(decobench.some(word => message.content.toLowerCase().includes(word))) {
            if (message.member.roles.cache.has('233739812761370624') || message.member.roles.cache.has('233739690870571008') || message.member.roles.cache.has('233739812761370624') || message.channel.parent.id === "424667177241673729" || message.channel.parent.id === "433404487865073665" || message.channel.parent.id === "613357718987603987" || message.channel.parent.id === "643264150994419713")
            {
                return;
            } else {
                try {
                    const statsEmbed = new EmbedBuilder()
                        .setColor(embedColor)
                        .setDescription("Crafting *And the decobench by extension* do not currently exist within the 1.16.x versions of Decocraft. It will however be added in the future.")
                    message.reply({ embeds: [statsEmbed] });
                } catch (e) {
			        message.channel.send('An error occured\n'+e)
			        return;
		        }
            }
        }

        const question = ["i have a question", "can i ask a question", "can i ask you something", "can i ask you a question", "can i ask something"];
	    if( question.some(word => message.content.toLowerCase().includes(word)) ) {
    		var roll = ["Just ask it, it's not THAT hard", "Yes, you have my legal consent to ask questions", "JUST ASK YOUR QUESTION!!!!", 'You just did.', 'Ask away!', 'Then ask it.', 'https://dontasktoask.com/']
		    var randomAnswer = roll[Math.floor(Math.random() * roll.length)];
		    message.reply({ content: randomAnswer })
	    }
	},
};