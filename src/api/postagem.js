const PostagemController = require('../controller/postagem');

class PostagemApi {
    async criarPostagem(req, res) {
        const titulo = req.body.titulo
        const conteudo = req.body.conteudo;
        const controller = new PostagemController();

        try {
            const postagem = await controller.criarPostagem(titulo, conteudo);
            return res.status(201).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarPostagem(req, res) {
        const { id } = req.params;
        const { titulo, conteudo } = req.body;
        const controller = new PostagemController();

        try {
            const postagem = await controller.alterarPostagem(Number(id), titulo, conteudo);
            return res.status(200).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarPostagem(req, res) {
        const { id } = req.params;
        const controller = new PostagemController();

        try {
            await controller.deletarPostagem(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarPostagem(req, res) {
        const controller = new PostagemController();

        try {
            const postagem = await controller.listarPostagens();
            return res.status(200).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = PostagemApi;