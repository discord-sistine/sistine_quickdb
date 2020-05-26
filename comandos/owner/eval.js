const Discord = require('discord.js')
const config = require('../../config.json')
const db = require("quick.db");

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, message, args) => {
    let member = message.mentions.users.first() || message.author;
  
    if (message.author.id !== '675439542110650399') return message.channel.send('<:gierro:710197544751202414> » Você não pode utilizar este comando, Apenas pessoas especiais.');
    
  let prefixos = db.get(`prefixos_${message.guild.id}`)
  if (prefixos === null) prefixos = `${config.prefix}`
  
    if(!args[0]) {
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("**<:gierro:710197544751202414> » Uso incorreto do comando**")
                .setDescription("<:dokypin1:700516924404269056> › Tente usar ``" + `${prefixos}${this.help.name} script` + "``")
                .addField('**Alternativas**', `\`nenhum\``, false)
                .addField('**Permissões**', `\`nenhum\``, false)
                .setColor('4287f5'));
        }
  
  let code = args.slice(0).join(' ');
  
    args = args.join(" ");
    try {
        var evaled = eval(args);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
      
      const sucessembed = new Discord.MessageEmbed()
      .setColor('4287f5')
      .setTitle('<:gicerto:710198069068562473> » Comando funcionando')
      .setDescription(`
<a:updating:556685577152626688> » **entrada**\n
\`\`\`${code}\`\`\`
<a:cz_outcoming2:708772113078812693> » **Saida**\n
\`\`\`js\n${clean(evaled)}\n\`\`\``)
      .setFooter(`Comando usado por: ${member.username}`)
      .setTimestamp()
        message.channel.send(sucessembed).then(msg => { // definindo a função 'then' como 'msg'

    msg.react('710207069420126260')

    const filter = (reaction, user) => { // Criando um filtro para quem clicou no emoji
      return ['710207069420126260'].includes(reaction.emoji.id) && user.id === message.author.id; // caso o ID do usuário que clicou, seja igual ao do que puxou, iremos fazer a ação
    };
          
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) // retornnando com as reações
      .then(collected => { // mais uma função 'then', definida como 'collected'
        const reaction = collected.first();
      //cor rosa
        if (reaction.emoji.id === '710207069420126260') {
          msg.delete()
          message.channel.send('<:gierro:710197544751202414> » Eval deletado'); 
        
        } 
      })
  })

    } catch (err) {
      
      const erroembed = new Discord.MessageEmbed()
      .setColor('4287f5')
      .setTitle('<:gierro:710197544751202414> » Ocorreu um erro')
      .setDescription(`
<a:updating:556685577152626688> » **Entrada**\n
\`\`\`${code}\`\`\`
<a:cz_outcoming2:708772113078812693> » **Saida**\n
\`\`\`js\n${clean(err)}\n\`\`\``)
      .setFooter(`Comando usado por: ${member.username}`)
      .setTimestamp()
        message.channel.send(erroembed).then(msg => { // definindo a função 'then' como 'msg'

    msg.react('710207069420126260')

    const filter = (reaction, user) => { // Criando um filtro para quem clicou no emoji
      return ['710207069420126260'].includes(reaction.emoji.id) && user.id === message.author.id; // caso o ID do usuário que clicou, seja igual ao do que puxou, iremos fazer a ação
    };
          
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) // retornnando com as reações
      .then(collected => { // mais uma função 'then', definida como 'collected'
        const reaction = collected.first();
      //cor rosa
        if (reaction.emoji.id === '710207069420126260') {
          msg.delete()
          
          message.reply('<:gierro:710197544751202414> » Eval deletado'); 
        
        } 
      })
  })
}
}

exports.help = {
  name: 'eval',
  aliases: []
};