const music = require("../model/music.json")
const fs = require("fs")

const getAllMusic = (req, res) => {
    console.log(req.url)
    res.status(200).send(music)
}

const createMusic = (req, res) => {
    const { id, title, duration, launchYear, favorited, artists } = req.body
    music.push({ id, title, duration, launchYear, favorited, artists }) 
    fs.writeFile("./src/model/music.json", JSON.stringify(music), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }) 
        } else {
            console.log("A musica foi gravada no arquivo com sucesso!")
            const musicFound = music.find(music => music.id == id) 
            res.status(200).send(musicFound)
        }
    })
}

const getMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = music.find(music => music.id == musicId)

    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        
        res.status(404).send({ message: "Musica não encontrada" })
    }
}

const updateMusic = (req, res) => {
    const musicId = req.params.id
    const musicToUpdate = req.body

    const musicFound = music.find(music => music.id == musicId) 
    const musicIndex = music.indexOf(musicFound) 

    if (musicIndex >= 0) { 
        music.splice(musicIndex, 1, musicToUpdate) 
        fs.writeFile("./src/model/music.json", JSON.stringify(music), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Arquivo de Musica foi atualizado com sucesso!")
                const musicUpdated = music.find(music => music.id == musicId)
                res.status(200).send(musicUpdated)
            }
        })
    } else {
        
        res.status(404).send({ message: "Musica não encontrada para ser atualizada!" })
    }
}

const updateHeardStatus = (req, res) => {
    try {
        const musicId = req.params.id
        const newHeard = req.body.heard 

        const musicToUpdate = music.find(music => music.id == musicId) 
        const musicIndex = music.indexOf(musicToUpdate)

        if (musicIndex >= 0) {
            
            musicToUpdate.heard = newHeard 
            music.splice(musicIndex, 1, musicToUpdate) 
            fs.writeFile("./src/model/music.json", JSON.stringify(music), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo de Musica foi atualizado com sucesso!")
                    const musicUpdated = music.find(music => music.id == musicId)
                    res.status(200).send(musicUpdated)
                }
            })
        } else {
            
            res.status(400).send({ message: "Musica não encontrada para atualizar o status de ouvida" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na api")
    }

}

const deleteMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicFound = music.filter(music => music.id == musicId) 

        if (musicFound && musicFound.length > 0) {
            musicFound.forEach(music => { 
                const musicIndex = music.indexOf(music)
                music.splice(musicIndex, 1)
            })

            fs.writeFile("./src/model/music.json", JSON.stringify(music), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Musica deletada com sucesso!")
                    res.sendStatus(204) 
                }
            })

        } else {
            res.status(400).send({ message: "Music não encontrado para deletar" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao deletar musica" })
    }
}

module.exports = {
    getAllMusic,
    createMusic,
    getMusic,
    updateMusic,
    updateHeardStatus,
    deleteMusic
}