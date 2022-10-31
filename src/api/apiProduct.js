const db = require('../database/models');
const { Op }= require('sequelize');
const sequelize = db.sequelize
const path = require('path');


//const universalModel = require('../model/universalModel'); 
//const productModel = universalModel('products');

const apiProduct = { 

    /* mostrarProductos: async (req,res) =>{
        try {
            
            console.log("Esto contiene req.url: " + req.url);

            const allProducts = await db.Products.findAll({
                include: [db.Images]
            }) 
            const table = allProducts.filter( product => product.id_category == "2" );
            const coffeeTable = allProducts.filter( product => product.id_category == "4" );
            const desk = allProducts.filter( product => product.id_category == "1" );
            const mirror = allProducts.filter( product => product.id_category == "3" );
            let meta = {
                status: 200,
                url: '/api/apiProduct',
                count: allProducts.length,
                countByCategory: {
                    Mesas : table.length,
                    MesasRatonas : coffeeTable.length,
                    Espejos : mirror.length,
                    Escritorios : desk.length
                }
            }
                
            let products = []

            allProducts.forEach( product =>{
                products.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.id_category,
                    color: product.id_color,
                    detail: `${req.headers.host}/api/products/${product.id}`
                })
            })

            let respuesta = {meta, data: products}
            return res.json(respuesta)

        } catch (error) {
            res.json({error: error.message});
        }
    }, */

    mostrarProductos: async (req,res) =>{
        try {
                
            let info = [];
            let respuesta;
            let busqueda;
            let products = [];

            if (req.query.search == "") {
                respuesta = {
                    meta: {
                        status: 400,
                        url: `/api/apiProducts${req.url}`,
                    },
                    data: 'Debe ingresar una palabra'
                }

                return res.json(respuesta);
            }

            if (req.query.search) {
                console.log("Entré al query search");
                busqueda = req.query.search.toUpperCase();
                products = await db.Products.findAll({
                    include: [{ model: db.Categories }, { model: db.Colors }, { model: db.Images}],
                    where: { description: { [Op.like]: '%' + busqueda + '%' } },
                    limit: 10
                })
            }
            else {
                /* const allProducts = await db.Products.findAll({
                    include: [db.Images]
                }) 
                const table = allProducts.filter( product => product.id_category == "2" );
                const coffeeTable = allProducts.filter( product => product.id_category == "4" );
                const desk = allProducts.filter( product => product.id_category == "1" );
                const mirror = allProducts.filter( product => product.id_category == "3" );

                allProducts.forEach( product =>{
                    products.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.id_category,
                        color: product.id_color,
                        detail: `${req.headers.host}/api/products/${product.id}`
                    })
                }) */
                products = await db.Products.findAll({
                    include: [db.Images]
                });

/*                 products.forEach( product => {
                    info.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.id_category,
                        color: product.id_color,
                        detail: `${req.headers.host}/api/products/${product.id}`
                    })
                }) */
            }

            products.forEach( product => {
                info.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    measures: product.measures,
                    discount: product.discount,
                    category: product.id_category,
                    color: product.id_color,
                    image: `images/products/${product.Images[0].path}` 
                })
            })
            
            const table = info.filter( product => product.category == "2" );
            const coffeeTable = info.filter( product => product.category == "4" );
            const desk = info.filter( product => product.category == "1" );
            const mirror = info.filter( product => product.category == "3" );

            let meta = {
                status: 200,
                url: `/api/apiProduct${req.url}`,
                count: info.length,
                countByCategory: {
                    Mesas : table.length,
                    MesasRatonas : coffeeTable.length,
                    Espejos : mirror.length,
                    Escritorios : desk.length
                }
            }

            respuesta = {meta, data: info}
            return res.json(respuesta)

        } catch (error) {
            res.json({error: error.message});
        }
    },

    lastProduct: async (req, res) =>{
        try {
            const lastProduct = await db.Products.findAll({
                include: [db.Images],
                order: [['id', 'DESC']],
                limit: 1
            }) 
            let product = [...lastProduct][0]
            product = product.toJSON()
                product.image = `images/products/${product.Images[0].path}`;

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/productos/ultimo`,
                    },
                    data: product
                }
                res.status(200).json(respuesta);
        } catch (error) {
            res.json({error: error.message});           
        }
    },


    mostrarProducto: async (req,res) =>{
        try {            
            const id = +req.params.id;
            const product = await db.Products.findByPk(id,{
                include:[db.Images, db.Colors, db.Categories]
            });

            let meta = {
                status: 200,
                url: `/api/productos/${id}` 
            }
            let data = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                measures: product.measures,
                discount: product.discount,
                category: product.id_category,
                color: product.id_color,
                image: `images/products/${product.Images[0].path}` 
            }

            let respuesta = {meta, data}
            return res.json(respuesta)
        } catch (error) {
            res.json({error: error.message});
        }
    },

}

module.exports = apiProduct
