const { commandMetrics } = require('../functions.js')
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitFieldBitField } = require('discord.js')
const locale = require('./plugins/decobot-utilities/locale/en.json')
const SQLite = require("better-sqlite3");
const sql = new SQLite('./bot.sqlite');
const { embedColor, botIDs } = require('./config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faq')
		.setDescription('Read the answers to some frequently asked questions')
        .setDMPermission(false)
		.addStringOption((option) => 
			option
				.setName('question')
				.setDescription('What\'s your question?')
				.setRequired(true)
				.addChoices(
					{ name: 'How to add RAM to Minecraft?', value: 'ram' },
					{ name: 'How to set up a forge server?', value: 'server' },
                    { name: 'When will {modversion} release?', value: 'patience' },
				)
		)
        .addUserOption((option) => 
			option
				.setName('user')
				.setDescription('An optional user. Only for mods/admins.')
				.setRequired(false)
		),
	async execute(interaction) {
        const client = interaction.client
        const user = interaction.options.getUser('user')
        const question = interaction.options.getString('question')

        if(question === "ram") {
            const embed = new EmbedBuilder()
                .setDescription(`You can follow this guide to allocate more RAM and decrease lag. [link](https://lockyzdev.net/more-minecraft-ram/)`)
                .setTimestamp()
            interaction.reply({ embeds: [embed] })
        }

        if(question === "server") {
            const embed = new EmbedBuilder()
                .setDescription(`You can follow a guide by instructables.com to create a server. [link](https://www.instructables.com/How-to-Setup-a-Modded-Minecraft-Server-1122/)`)
                .setTimestamp()
            interaction.reply({ embeds: [embed] })
        }

        if(question === "patience") {
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setDescription(`Please don\'t ask for backports/updates to other Minecraft versions.\nA 1.16 version of decocraft is currently in alpha and new builds will be released every now and then.\n\nI am a bot performing an automated action, if this message shows up in error please contact the developers of this bot within our discord server. [Direct Link to our Discord](https://discord.gg/NgpN3YYbMM)`)
                .setTimestamp();
            //
            if(user) {
                if(interaction.member.roles.cache.has('233739812761370624') || interaction.member.roles.cache.has('233739690870571008') || interaction.member.roles.cache.has('388323416576491520')) {
                    interaction.channel.send({ content: '<@'+user.id+'>', embeds: [embed] })
                } else {
                    interaction.channel.send({ embeds: [embed] })
                }
            } else {
                interaction.channel.send({ embeds: [embed] })
            }
        }
	}
};
