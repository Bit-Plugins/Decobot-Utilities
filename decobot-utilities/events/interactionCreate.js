const { EmbedBuilder } = require('discord.js');
const { embedColor, ownerID } = require('../config');
const SQLite = require("better-sqlite3");
const messageUpdate = require('../logging/messageUpdate');
const sql = new SQLite('./bot.sqlite');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        const client = interaction.client
        const tempusID = '229690400816889856'

        client.getUsSett = sql.prepare("SELECT * FROM userSettings WHERE userID = ?");
        client.setUsSett = sql.prepare("INSERT OR REPLACE INTO userSettings (userID, userAccess, language) VALUES (@userID, @userAccess, @language);");
        let userset = client.getUsSett.get(interaction.user.id)

        if(!userset) {
            userset = { userID: interaction.user.id, userAccess: 'false', language: 'en' };
            client.setUsSett.run(userset);
        }

        if(interaction.isSelectMenu()) {
            if(interaction.customId === 'role_menu') {
                let userid = interaction.user.id;
                let member = interaction.guild.members.cache.get(interaction.user.id)

                if(interaction.values.includes('game_night')) {
                    if(member.roles.cache.has('757851094260121671')) {
                        member.roles.remove('757851094260121671')
                        interaction.reply({ content: 'Done, removed the Game Night role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Taken | "+interaction.user.username)
                            .setDescription("Took the Game Night role from "+interaction.user.username)
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    } else {
                        member.roles.add('757851094260121671')
                        interaction.reply({ content: 'Done, gave you the Game Night role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Given | "+interaction.user.username)
                            .setDescription("Gave "+interaction.user.username+" the Game Night role")
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    }
                }

                if(interaction.values.includes('poll_pings')) {
                    if(member.roles.cache.has('1081417626548453378')) {
                        member.roles.remove('1081417626548453378')
                        interaction.reply({ content: 'Done, removed the Poll Pings role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Taken | "+interaction.user.username)
                            .setDescription("Took the Poll Pings role from "+interaction.user.username)
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    } else {
                        member.roles.add('1081417626548453378')
                        interaction.reply({ content: 'Done, gave you the Poll Pings role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Given | "+interaction.user.username)
                            .setDescription("Gave "+interaction.user.username+" the Poll Pings role")
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    }
                }

                if(interaction.values.includes('announcement')) {
                    if(member.roles.cache.has('757851288577900554')) {
                        member.roles.remove('757851288577900554')
                        interaction.reply({ content: 'Done, removed the Announcement Ping role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Taken | "+interaction.user.username)
                            .setDescription("Took the Announcement ping role from "+interaction.user.username)
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    } else {
                        member.roles.add('757851288577900554')
                        interaction.reply({ content: 'Done, gave you the Announcement Ping role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Given | "+interaction.user.username)
                            .setDescription("Gave "+interaction.user.username+" the Announcement Ping role")
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    }
                }

                if(interaction.values.includes('giveaway')) {
                    if(member.roles.cache.has('763227657553969212')) {
                        member.roles.remove('763227657553969212')
                        interaction.reply({ content: 'Done, removed the giveaway role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Taken | "+interaction.user.username)
                            .setDescription("Took the giveaway role from "+interaction.user.username)
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    } else {
                        member.roles.add('763227657553969212')
                        interaction.reply({ content: 'Done, gave you the giveaway role', ephemeral: true })
                        const embed = new EmbedBuilder()
                            .setTitle("Role Given | "+interaction.user.username)
                            .setDescription("Gave "+interaction.user.username+" the giveaway role")
                        client.channels.cache.get("683458185763225617").send({ embeds: [embed] });
                    }
                }

                
            }
        }

        if(interaction.isModalSubmit()) {
            if(interaction.customId === 'userSettings') {
                const userAccess = interaction.fields.getTextInputValue('userAccess');
                const languageUser = interaction.fields.getTextInputValue('languageUser');
    
                userset = { userID: interaction.user.id, userAccess: userAccess, language: languageUser }
                client.setUsSett.run(userset);
                interaction.reply({ content: 'Your settings have been set.', ephemeral: true })
            } else {
                const moodVer = interaction.fields.getTextInputValue('modVersion');
                const relStat = interaction.fields.getTextInputValue('releaseStatus').toLowerCase();
                const curLunk = interaction.fields.getTextInputValue('coorselink');
                const modrLunk = interaction.fields.getTextInputValue('modrinthlink');

                if(moodVer) {
                    var modSpell = 'yes'
                    var mcVer = 'alsoyes'
                    var desc

                    switch(interaction.customId) {
                        case 'decocraft112':
                            modSpell = 'Decocraft'
                            mcVer = '1.12.2'
                        break;
                        case 'decocraft116':
                            modSpell = 'Decocraft'
                            mcVer = '1.16.4'
                        break;
                        case 'decocraft118':
                            modSpell = 'Decocraft'
                            mcVer = '1.18.2'
                        break;
                        case 'decocraft120':
                            modSpell = 'Decocraft'
                            mcVer = '1.20.1'
                        break;
                        case 'decocraft121':
                            modSpell = 'Decocraft'
                            mcVer = '1.21.0'
                        break;
                        case 'camera112':
                            modSpell = 'Camera Obscura'
                            mcVer = '1.12.2'
                        break;
                        case 'camera116':
                            modSpell = 'Camera Obscura'
                            mcVer = '1.16.4'
                        break;
                        case 'camera118':
                            modSpell = 'Camera Obscura'
                            mcVer = '1.18.2'
                        break;
                        case 'camera120':
                            modSpell = 'Camera Obscura'
                            mcVer = '1.20.1'
                        break;
                        case 'camera121':
                            modSpell = 'Camera Obscura'
                            mcVer = '1.21.0'
                        break;
                        case 'ptrlib112':
                            modSpell = 'PTRLib'
                            mcVer = '1.12.2'
                        break;
                        case 'ptrlib116':
                            modSpell = 'PTRLib'
                            mcVer = '1.16.4'
                        break;
                        case 'ptrlib118':
                            modSpell = 'PTRLib'
                            mcVer = '1.18.2'
                        break;
                        case 'ptrlib120':
                            modSpell = 'PTRLib'
                            mcVer = '1.20.1'
                        break;
                        case 'ptrlib121':
                            modSpell = 'PTRLib'
                            mcVer = '1.21.0'
                        break;
                    }

                    if(modSpell === "PTRLib") {
                        desc = "A craftstudio importer and rendering library."
                    } else if(modSpell === "Camera Obscura") {
                        desc = "Camera Obscura is a photography mod for Minecraft that allows you to take pictures and place them in frames to decorate your world!"
                    } else if(modSpell === "Decocraft") {
                        desc = "Decocraft adds in over 3000 decorations for your Minecraft World. This mod will definitely give you a lot more variety when decorating your builds. Many of the items are actually functional as well!"
                    }

                    client.getRecommend = sql.prepare("SELECT * FROM recommended WHERE Mod = ?");
	                client.setRecommend = sql.prepare("INSERT OR REPLACE INTO recommended (Mod, Version, Minecraft, Forge, PTRLib, Name, curseLink, modrinthLink, relstatus, Description) VALUES (@Mod, @Version, @Minecraft, @Forge, @PTRLib, @Name, @curseLink, @modrinthLink, @relstatus, @Description);");
                    let recommended;

                    recommended = client.getRecommend.get(interaction.customId)
                    recommended = { Mod: interaction.customId, Version: moodVer, Minecraft: mcVer, Forge: "N/A", PTRLib: "N/A", Name: modSpell, curseLink: curLunk, modrinthLink: modrLunk, relstatus: relStat, Description: desc }
                    client.setRecommend.run(recommended)
                    interaction.reply({ content: 'Successfully updated the version information for '+modSpell+' '+mcVer, ephemeral: true })
                } else {
                    return;
                }
            }
        }
	},
};