const Router = require('express');

const {createEmpresas, findAllEmpresas, findEmpresa, updateEmpresa, deleteEmpresa} = require( "./controllers/EmpresasController");
const ContatoEmpresasController = require( "./controllers/ContatoEmpresasController");
const CarroceriaController = require( "./controllers/CarroceriaController");
const VeiculoController  = require( "./controllers/VeiculoController");
const CaminhoneiroController = require( "./controllers/CaminhoneiroController");
const EspecieController = require( "./controllers/EspecieController");
const FretesController = require( "./controllers/FretesController");

// import all controllers
// import SessionController from './app/controllers/SessionController';


const routes = new Router.Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

// ROTAS EMPRESAS

routes.post("/empresas", createEmpresas);
routes.get("/empresas", findAllEmpresas);
routes.get("/empresas/:cnpj", findEmpresa);
routes.put("/empresas/:cnpj", updateEmpresa);
routes.delete("/empresas/:cnpj", deleteEmpresa);


// ROTAS CONTATO EMPRESAS

routes.get("/empresas/contato/:cnpj", ContatoEmpresasController.findContatoEmpresa);
routes.put("/empresas/contato/:cnpj", ContatoEmpresasController.updateContatoEmpresa);


// ROTAS CARROCERIA

routes.post("/carrocerias", CarroceriaController.createCarroceria);
routes.get("/carrocerias", CarroceriaController.findAllCarroceria);
routes.get("/carrocerias/:carroceria", CarroceriaController.findCarroceria);
routes.put("/carrocerias/:carroceria", CarroceriaController.updateCarroceria);
routes.delete("/carrocerias/:carroceria", CarroceriaController.deleteCarroceria);

// ROTAS VEICULOS

routes.post("/veiculos", VeiculoController.createVeiculo);
routes.get("/veiculos", VeiculoController.findAllVeiculo);
routes.get("/veiculos/:veiculo", VeiculoController.findVeiculo);
routes.put("/veiculos/:veiculo", VeiculoController.updateVeiculo);
routes.delete("/veiculos/:veiculo", VeiculoController.deleteVeiculo);

// ROTAS VEICULOS

routes.post("/caminhoneiros", CaminhoneiroController.createCaminhoneiro);
routes.get("/caminhoneiros", CaminhoneiroController.findAllCaminhoneiro);
routes.get("/caminhoneiros/:cpf", CaminhoneiroController.findCaminhoneiro);
routes.put("/caminhoneiros/:cpf", CaminhoneiroController.updateCaminhoneiro);
routes.delete("/caminhoneiros/:cpf", CaminhoneiroController.deleteCaminhoneiro);


// ROTAS ESPECIE

routes.post("/especies", EspecieController.createEspecie);
routes.get("/especies", EspecieController.findAllEspecie);
routes.get("/especies/:especie", EspecieController.findEspecie);
routes.put("/especies/:especie", EspecieController.updateEspecie);
routes.delete("/especies/:especie", EspecieController.deleteEspecie);


// ROTAS FRETE

routes.post("/fretes", FretesController.createFrete);
routes.get("/fretes", FretesController.findAllFrete);
routes.get("/fretes/:id", FretesController.findFrete);
routes.put("/fretes/:id", FretesController.updateFrete);
routes.delete("/fretes/:id", FretesController.deleteFrete);


// ROTAS PROCURA FRETES

routes.post("/fretes", FretesController.createFrete);
routes.get("/fretes", FretesController.findAllFrete);
routes.get("/fretes/:id", FretesController.findFrete);
routes.put("/fretes/:id", FretesController.updateFrete);
routes.delete("/fretes/:id", FretesController.deleteFrete);


module.exports = routes;
