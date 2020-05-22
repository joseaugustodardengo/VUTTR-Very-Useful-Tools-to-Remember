/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                link: Sequelize.STRING,
                description: Sequelize.STRING,
                tags: Sequelize.ARRAY(Sequelize.STRING),
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}

export default Tool;
