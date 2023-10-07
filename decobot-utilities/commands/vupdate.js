const { SlashCommandBuilder } = require('@discordjs/builders');
const SQLite = require("better-sqlite3");
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputComponent, TextInputBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { embedColor, botIDs } = require('./config');
const { version } = require('../info');
const sql = new SQLite('./bot.sqlite');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vupdate')
		.setDescription('Update mod version information.')
            .addStringOption((option) =>
                option
                    .setName('mod_name')
                    .setDescription('The name of the mod you wanna update the information for.')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Decocraft', value: 'decocraft' },
                        { name: 'Camera Obscura', value: 'cobscura' },
                        { name: 'PTRLib', value: 'ptrlib' },
                    )
                )
            .addStringOption((option) =>
                option
                    .setName('minecraft_version')
                    .setDescription('The version of Minecraft the new version is for.')
                    .setRequired(true)
                    .addChoices(
                        { name: '1.7', value: '107' },
                        { name: '1.12', value: '112' },
                        { name: '1.16', value: '116' },
                        { name: '1.17', value: '117' },
                        { name: '1.18', value: '118' },
                        { name: '1.19', value: '119' },
                        { name: '1.20', value: '120' },
                        { name: '1.21', value: '121' },
                )
            ),
	async execute(interaction) {
            const client = interaction.client
            var mod = 'eh'
            if(interaction.member.id === "691995332246110288" || interaction.member.id === "835394949612175380" || interaction.member.id === "142682837915664384") {
                const modNume = interaction.options.getString('mod_name')
                const mcVer = interaction.options.getString('minecraft_version')

                const modal = new ModalBuilder()
                    .setCustomId(modNume+mcVer)
                    .setTitle('Mod Update')

                const modVersion = new TextInputBuilder()
                    .setCustomId('modVersion')
                    .setLabel("What's the new mod version?")
                    .setStyle('Short')
                    .setRequired(true)

                const relStatus = new TextInputBuilder()
                    .setCustomId('releaseStatus')
                    .setLabel("Alpha, Beta, Release")
                    .setStyle('Short')
                    .setRequired(false)

                const coorselink = new TextInputBuilder()
                    .setCustomId('coorselink')
                    .setLabel("What's this updates Curseforge link?")
                    .setStyle('Short')
                    .setRequired(false)

                const modrinthlink = new TextInputBuilder()
                    .setCustomId('modrinthlink')
                    .setLabel("What's this updates Modrinth link?")
                    .setStyle('Short')
                    .setRequired(false)

                const secondActionRow = new ActionRowBuilder().addComponents(modVersion);
                const fourthActionRow = new ActionRowBuilder().addComponents(relStatus);
                const sixthActionRow = new ActionRowBuilder().addComponents(coorselink);
                const seventhActionRow = new ActionRowBuilder().addComponents(modrinthlink);
                
                modal.addComponents(secondActionRow, fourthActionRow, sixthActionRow, seventhActionRow);
                
                await interaction.showModal(modal);
            }
		}
};
