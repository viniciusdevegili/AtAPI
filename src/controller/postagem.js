const Postagem = require('../model/postagem');

class PostagemController {
    async criarPostagem(titulo, conteudo) {
        if (
            titulo === undefined
            || conteudo === undefined
        ) {
            throw new Error('Titulo e conteúdo são obrigatórios');
        }

        // INSERT INTO postagens (titulo, conteudo) VALUES (titulo, conteudo);
        const postagem = await Postagem
            .create({ titulo, conteudo });

        return postagem;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const postagem = await Postagem.findByPk(id);

        if (!postagem) {
            throw new Error('Postagem não encontrada');
        }

        return postagem;
    }

    async alterarPostagem(titulo, conteudo) {
        if (
            id === undefined
            || titulo === undefined
            || conteudo === undefined
        ) {
            throw new Error('Id, titulo e conteúdo são obrigatórios');
        }

        const postagem = await this.buscarPorId(id);

        postagem.titulo = titulo;
        postagem.conteudo = conteudo;
        // UPDATE postagens SET titulo = titulo, conteudo = conteudo, WHERE id = id;
        postagem.save();

        return postagem;
    }

    async deletarPostagem(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const postagem = await this.buscarPorId(id);

        postagem.destroy();
    }

    async listarPostagens() {
        return Postagem.findAll();
    }
}

module.exports = PostagemController;