const Discord = require("discord.js"); // puxando a livraria discord.js
const db = require('quick.db'); // puxando a npm quick.db (uma database, que para instalar, basta digitar no seu terminal: npm i quick.db)
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  let member = message.mentions.users.first() || message.author; // caso ele n mencione, vai ser pra si mesmo
    
  let envlog = db.get(`envlog_${message.guild.id}`)
  if (envlog === null) envlog = '`Nenhum canal definido!`';
  if (envlog === 0) envlog = '`Nenhum canal definido!`';
  
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("<:gierro:710197544751202414> » Você precisa da permisão de: `ADIMINISTRADOR` para utilizar este comando.")
  
  
  if (isNaN(args.join(" "))) return message.channel.send('<:gierro:710197544751202414> » Isto não e um id')
  
  if (!args[0]){
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("**<:gierro:710197544751202414> » Uso incorreto do comando**")
                .setDescription("<:gipin:710194953028108338> › Tente usar ``" + `${config.prefix}${this.help.name} [id do canal]` + "``")
                .addField('**Alternativas**', `\`${this.help.aliases}\``, false)
                .addField('**Permissões**', `\`Adiministrador\``, false)
                .setColor('#4287f5'));
        }
  
  if (args[0] === 'reset') {
    const embedreset = new Discord.MessageEmbed()
    .setDescription(`Você deseja desativar o Canal de logs neste servidor?, Não será mais enviado as mensagens de quando um usuario apagar uma mensagem ou editar.`)
    .setColor('4287f5')
    
    message.channel.send(embedreset).then(msg => {
      
      //<:gierro:710197544751202414> 
      //<:gicerto:710198069068562473> 
    msg.react('710198069068562473').then(() => msg.react('710197544751202414'))

    const filter = (reaction, user) => { 
      return ['710198069068562473', '710197544751202414'].includes(reaction.emoji.id) && user.id === message.author.id;
    };
          
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) 
      .then(collected => {
        const reaction = collected.first();
      
      if (reaction.emoji.id === '710198069068562473') {
          msg.delete()
          message.channel.send('<:gicerto:710198069068562473> » Canal de logs resetado com sucesso'); 
          db.delete(`envlog_${message.guild.id}`)
        }
      
        if (reaction.emoji.id === '710197544751202414') {
          msg.delete()
          message.channel.send('<:gicerto:710198069068562473> » Comando cancelado com sucesso'); 
        
        }
      
      })
    })
  }
  
    // puxando o membro que iremos enviar
    let text = args.slice(0).join(' ')
    
    console.log(`canal de logs foi setado com sucesso: <#${text}> no servidor: ${message.guild.name} id: ${message.guild.id}`)
    client.channels.cache.get('705126526194024510').send(`canal de logs foi setado com sucesso: <#${text}> no servidor: ${message.guild.name} id: ${message.guild.id}`)
  
  const embed = new Discord.MessageEmbed()
  .setDescription(`Você deseja colocar o canal\n\n <#${args[0]}>\n\nComo o canal onde será enviada as mensagens apagadas ou editadas?`)
  .setColor('#4287f5');
  message.channel.send(embed).then(msg => {
      
    msg.react('710198069068562473').then(() => msg.react('710197544751202414'))

    const filter = (reaction, user) => { 
      return ['710198069068562473', '710197544751202414'].includes(reaction.emoji.id) && user.id === message.author.id; // caso o ID do usuário que clicou, seja igual ao do que puxou, iremos fazer a ação
    };
          
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) 
      .then(collected => {
        const reaction = collected.first();
      
      //message.channel.send(`) 
      //
      if (reaction.emoji.id === '710198069068562473') {
          msg.delete()
          message.channel.send('<:gicerto:710198069068562473> » canal de logs foi setado com sucesso em:\n'+`<#${args[0]}>`); 
          db.set(`envlog_${message.guild.id}`, args.slice(0).join(' '))
        }
      
        if (reaction.emoji.id === '710197544751202414') {
          msg.delete()
          message.channel.send('<:gierro:710197544751202414> » Comando cancelado com sucesso'); 
        
        }
      
      })
    })
}

exports.help = {
    name: 'logchannel',
  aliases: ["channellog"]
}