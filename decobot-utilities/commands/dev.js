const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')
const { embedColours, botIDs } = require('../config');
const locale = require('../locale/en.json');
const { group } = require('console');
const SQLite = require("better-sqlite3");
const sql = new SQLite('../plugins/decobot-utilities/bot.sqlite');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription('Execute Bot Developer Commands.')
        .addSubcommandGroup((group) =>
            group
                .setName('manage')
                .setDescription('Manage either the bot or the server.')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bot')
                        .setDescription('Manage the Bot')
                        .addStringOption((option) =>
                            option
                                .setName('option')
                                .setDescription('Which developer function did you want to run?')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'Restart', value: 'restart' },
                                    { name: 'Reload Commands', value: 'reload-cmds' },
                                    { name: 'List Commands', value: 'list-cmds' },
                                    { name: 'Delete Commands', value: 'delete-cmds' },
                                    { name: 'Create Role Select', value: 'role-select'},
                                )
                        )

                )
        ),
	async execute(interaction) {
        const client = interaction.client
        const option = interaction.options.getString('option')

        if(interaction.user.id === '835394949612175380') {
            if(option === 'reload-cmds') {
                //const tempus = require('../tempus');
                const commands = []
	            commands.clear
                client.commands = new Collection();
                const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
	                const command = require(`./${file}`);
	                // Set a new item in the Collection
	                // With the key as the command name and the value as the exported module
	                client.commands.set(command.data.name, command);
                }
                interaction.reply({ content: 'Done' })
            } else if (option === 'restart') {
                interaction.reply({ content: 'Currently cannot be done' })
            } else if (option === 'list-cmds') {
                const cmds = client.application.commands.cache
                const embed = new EmbedBuilder()
                    .setTitle("Command List")
                    .setDescription("All the commands and command Keys in this bot")
                    .setColor(embedColours.main)
                for(const data of cmds) {
                    embed.addField('\u200b', data.id+'>'+data.name);
                }
                await interaction.reply({ embeds: [embed] })
            }
            if(option === 'role-select') {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('role_menu')
                            .setPlaceholder('Role Select')
                            .addOptions(
                                {
                                    label: 'Game Night',
                                    description: 'Get mentioned when we run a game night.',
                                    value: 'game_night',
                                },

                                {
                                    label: 'Poll Mentions',
                                    description: 'Get mentioned when we run a poll.',
                                    value: 'poll_pings',
                                },

                                {
                                    label: 'Announcement Ping',
                                    description: 'Get mentioned when we announce something.',
                                    value: 'announcement',
                                },

                                {
                                    label: 'Giveaway',
                                    description: 'Get notified when we run a giveaway.',
                                    value: 'giveaway',
                                }
                            )
                    )
                
                interaction.channel.send({ content: 'Role Select', components: [row] });
            }
        } else {
            interaction.reply({ content: 'You do not have permission to use this command, shame on you. :('})
        }
	}
};
