const Discord = require("discord.js"); // puxando a livraria 'discord.js'

exports.run = (client, message, args) => {
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:gierro:710197544751202414> » Você precisa da permissão de: \`ADMINISTRATOR\` para utilizar este comando.`) // caso o autor nao possua, vamos dar o erro
             
               message.reply(`digite o título desse anúncio.`).then(msg2 => { // adicionando o then, setaremos um nome para o evento
                 let cj = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                 .on('collect', c => { // iniciando um evento
                   titulo = c.content // puxando o conteudo que o membro digitou
             
               message.reply(`digite a mensagem desse anúncio.`).then(msg3 => { // criando mais um then, com nome do evento
                   let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                   .on('collect', c => { // mais um evento
                       mensagem = c.content // um conteudo da mensagem

                            let embed = new Discord.MessageEmbed()

                            .setTitle(titulo)
                            .setDescription(mensagem)
                            .setFooter(`Anúncio feito por: ${message.author.username}`, message.author.avatarURL())
                            .setColor('4287f5')
                            .setTimestamp()

                            //message.channel.send(`@everyone`,embed)
                            message.channel.send(`<:dokyanuncio:700516669851959397> » @everyone`,embed)
                 })
              })
                 })
           })
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'anuncio',
  aliases: ["anunciar"]
}
