import * as Yup from 'yup';
import { Sequelize, Op } from 'sequelize';
import Tool from '../models/Tool';

class ToolController {
    async index(req, res) {
        let { tag } = req.query;

        if (tag) {
            tag = tag.toLowerCase();

            const literal = Sequelize.literal(`${tag}`).val;
            const fn = Sequelize.fn('ANY', Sequelize.col('tags'));
            const query = `'${literal}' = ${fn.fn} (${fn.args[0].col})`;

            const tools = await Tool.findAll({
                attributes: ['id', 'title', 'link', 'description', 'tags'],
                where: Sequelize.literal(query),
            });

            if (tools.length === 0) {
                return res.send('Não há resultado com o que foi buscado.');
            }

            return res.status(200).json(tools);
        }

        const { q } = req.query;
        if (q) {
            const tools = await Tool.findAll({
                attributes: ['id', 'title', 'link', 'description', 'tags'],
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${q}%` } },
                        { link: { [Op.like]: `%${q}%` } },
                        { description: { [Op.like]: `%${q}%` } },
                    ],
                },
            });

            if (tools.length === 0) {
                return res.send('Não há resultado com o que foi buscado.');
            }

            return res.status(200).json(tools);
        }

        const tools = await Tool.findAll({
            attributes: ['id', 'title', 'link', 'description', 'tags'],
        });

        return res.status(200).json(tools);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            link: Yup.string().required(),
            description: Yup.string().required(),
            tags: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        try {
            const { title, link, description, tags } = req.body;
            const tool = await Tool.create({
                user_id: req.userId,
                title,
                link,
                description,
                tags,
            });
            return res
                .status(201)
                .json({ id: tool.id, title, link, description, tags });
        } catch (error) {
            return res.status(error.status).send({
                error:
                    'Erro ao criar a ferramenta. Verifique os campos inseridos.',
            });
        }
    }

    async show(req, res) {
        const tool = await Tool.findOne({
            attributes: ['id', 'title', 'link', 'description', 'tags'],
            where: { id: req.params.id },
        });

        if (tool) return res.status(200).json(tool);

        return res.status(400).send({
            error: 'Ferramenta não encontrada.',
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            link: Yup.string(),
            description: Yup.string(),
            tags: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const tool = await Tool.findOne({
            where: { id: req.params.id },
        });

        if (!tool) {
            return res
                .status(400)
                .json({ error: 'Ferramenta procurada não existe.' });
        }

        const { title, link, description, tags } = req.body;

        const result = await Tool.update(
            { title, link, description, tags },
            { where: { id: tool.id } }
        );

        return res.json({ id: result.id, title, link, description, tags });
    }

    async delete(req, res) {
        try {
            await Tool.destroy({
                where: { id: req.params.id },
            });

            return res.status(204);
        } catch (error) {
            return res.status(error.status).send({
                error: 'Erro ao deletar a ferramenta.',
            });
        }
    }
}

export default new ToolController();
