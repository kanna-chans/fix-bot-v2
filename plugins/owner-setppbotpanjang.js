import fs from 'fs'
import jimp_1 from 'jimp'
let handler = async (m, { conn }) => {
     let q = m.quoted ? m.quoted : m
     let mime = (q.msg || q).mimetype || ''
     var media = await q.download()
     let botNumber = await conn.user.jid
     var { img } = await pepe(media)
     await conn.query({tag: 'iq', attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture' }, content: [{tag: 'picture', attrs: { type: 'image' }, content: img}]})
     m.reply('Berhasil mengubah foto profil bot menjadi panjang!')
}
handler.help = ['setbotpppanjang']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(setbotpppanjang|setppbotpanjang)$/i
export default handler

export async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}