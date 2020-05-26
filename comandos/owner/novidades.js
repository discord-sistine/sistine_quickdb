const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => { // setando a base
 // requisitando uma permissao, no caso, 'ADMINISTRADOR'
    if(message.author.id !== '675439542110650399') return message.channel.send(`${message.author}, Você não tem permissão para utilizar este comando, apenas pessoas especiais.`);
             
  let canalnovidades = await db.get(`canalnovi_${message.guild.id}`) // puxando a quantia de 'money' (nome que definimos) que possui registrado na db
  if (canalnovidades === null) canalnovidades = '`Nenhum canal definido!`';
  if (canalnovidades === 0) canalnovidades = '`Nenhum canal definido!`';
  
               message.reply(`digite o título desta novidade.`).then(msg2 => { // adicionando o then, setaremos um nome para o evento
                 let cj = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                 .on('collect', c => { // iniciando um evento
                   titulo = c.content // puxando o conteudo que o membro digitou
             
               message.reply(`digite a mensagem desta novidade.`).then(msg3 => { // criando mais um then, com nome do evento
                   let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                   .on('collect', c => { // mais um evento
                       mensagem = c.content // um conteudo da mensagem

                            let embed = new Discord.MessageEmbed()

                            .setTitle(titulo)
                            .setDescription(mensagem)
                            .setFooter(`${client.user.username}`, client.user.avatarURL())
                            .setColor('4287f5')
                            .setTimestamp()

                            //message.channel.send(`@everyone`,embed)
                            client.channels.cache.get(canalnovidades).send(`@everyone`, embed)
                 })
              })
                 })
           })
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'novidade',
  aliases: ["novidades"]
}
