const { SlashCommandBuilder } = require('@discordjs/builders');
const SQLite = require("better-sqlite3");
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputComponent, ButtonBuilder, ButtonStyle } = require('discord.js')
const { embedColours, botIDs } = require('./config');
const { version } = require('../info');
const sql = new SQLite('./plugins/decobot-utilities/bot.sqlite');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription('Get latest mod versions')
        .addStringOption((option) => 
			option
				.setName('mod')
				.setDescription('The mod you want version information for.')
				.setRequired(true)
                .addChoices(
                    { name: 'Decocraft', value: 'decocraft' },
                    { name: 'Camera Obscura', value: 'camera' },
                    { name: 'PTRLib', value: 'ptrlib' },
                )
		    )
            .addStringOption((option) => 
			    option
				    .setName('version')
				    .setDescription('What specific version would you like information for?')
				    .setRequired(true)
                    .addChoices(
                        { name: '1.7', value: '107' },
                        { name: '1.12', value: '112' },
                        { name: '1.16', value: '116' },
                    )
		        ),

	async execute(interaction) {
            const client = interaction.client
            const mod = interaction.options.getString('mod')
            const version = interaction.options.getString('version')

            client.getRecommend = sql.prepare("SELECT * FROM recommended WHERE Mod = ?");
			client.setRecommend = sql.prepare("INSERT OR REPLACE INTO recommended (Mod, PTRLib, Forge, Minecraft, Name, curseLink, modrinthLink, Version, relstatus, Description) VALUES (@Mod, @PTRLib, @Forge, @Minecraft, @Name, @curseLink, @modrinthLink, @Version, @relstatus, @Description);");
		
			let recommend;
            recommend = client.getRecommend.get(mod+version);

            if(!recommend) {
                interaction.reply({ content: "I'm sorry but this mod is not out for this version. Please keep an eye on <#370229399158521856> for future updates." })
                return;
            }

            const row = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
                        .setLabel('Curseforge')
					    .setStyle(ButtonStyle.Link)
					    .setURL(recommend.curseLink)
		        )

                if(recommend.modrinthLink === "N/A") {
                } else {
                    row.addComponents(
                        new ButtonBuilder()
                            .setLabel('Modrinth')
                            .setStyle(ButtonStyle.Link)
                            .setURL(recommend.modrinthLink)
                    )
                }

			const embed = new EmbedBuilder()
                if(recommend.relstatus === "alpha") {
                    embed.setDescription("# "+recommend.Name+"\n**This mod version is currently in alpha, please exercise caution for there may be bugs.**\n\n"+recommend.Description)
                    embed.setColor([255, 0, 0])
                } else if(recommend.relstatus === "obselete") {
                    if(recommend.Minecraft === "1.7.10") {
                        embed.setDescription("# "+recommend.Name+"\n**Minecraft 1.7.10 is VERY OLD, this version of the mod is no longer updated nor supported. Please visit the following website for reference https://howoldisminecraft1710.today**\n\n"+recommend.Description)
                    } else {
                        embed.setDescription("# "+recommend.Name+"\n**This version of the mod is VERY OLD and is no longer updated.**\n\n"+recommend.Description)
                    }
                    embed.setColor([255, 0, 0])
                } else if(recommend.relstatus === "beta") {
                    embed.setDescription("# "+recommend.Name+"\n**This mod version is currently in beta, please exercise caution for there may be bugs.**\n\n"+recommend.Description)
                    embed.setColor([255, 0, 255])
                } else if(recommend.relstatus === "release") {
                    embed.setDescription("# "+recommend.Name+"\n"+recommend.Description)
                    embed.setColor([0, 255, 0])
                }
                embed.addFields({ name: 'Mod Version', value: recommend.Version, inline:  true })
                if(recommend.PTRLib === "N/A") {
                } else {
                    embed.addFields({ name: 'PTRLib', value: recommend.PTRLib, inline:  true })
                }
            interaction.reply({ embeds: [embed], components: [row] })
		}
};
