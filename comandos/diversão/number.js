const Discord = require('discord.js');
const config = require('../../config.json')

exports.run = async (client, message, args) => {
        let min = parseInt(args[0]);
        let max = parseInt(args[1]);

        if(min > max){
            let temp = max;
            max = min;
            min = temp;
        }

        var Result = Math.floor(Math.random() * (max - min + 1)) + min;
  
        if (isNaN(Result)) {
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("**<:gierro:710197544751202414> » Uso incorreto do comando**")
                .setDescription("<:gipin:710194953028108338> › Tente usar ``" + `${config.prefix}${this.help.name} 1 4000` + "``")
                .addField('**Alternativas**', `\`${this.help.aliases}\``, false)
                .addField('**Permissões**', `\`nenhum\``, false)
                .setColor('4287f5'));
        }else{
            message.channel.send(Result);
        }
}


exports.help = {
    name: "number",
  aliases: ["randomnumber", "numero"]
}