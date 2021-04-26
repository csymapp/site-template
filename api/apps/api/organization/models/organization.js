'use strict'
module.exports = (sequelize, DataTypes) => {
	const organization = sequelize.define('organizations', {
		organizationId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		organizationName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [2, 32],
					msg: 'Please give us a correct organization name with atleast two characters'
				}
			}
		},
	},
		{
			hooks: {
			}

		})


	organization.associate = function (models) {
		organization.belongsTo(models.users, {
	    	onDelete: "CASCADE",
	    	onUpdate: "CASCADE",
			allowNull: false
	    });
	}
	return organization;
}
