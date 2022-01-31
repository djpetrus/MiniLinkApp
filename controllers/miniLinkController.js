"use strict";

const firebase = require("../db");
const MiniLink = require("../models/miniLink");
const firestore = firebase.firestore();
const config = require("../config");

/**
 * Gera um código ID aleatório para o Mini Link
 * @returns {String} Retorna o código gerado
 */
function gerarMiniLinkId() {
  let id = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
}

/**
 * Gera o URL do Mini Link
 * @returns {String} Retorna o URL do Mini Link
 */
function gerarMiniLink(id) {
  return config.url + "/" + id;
}

/**
 * Validar o URL informado (regex)
 * @returns {Boolean} Retorna true para um URL valido ou false para um URL inválido.
 */
function validarUrl(url) {
  console.log(url);
  return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
    url
  );
}

/**
 * Validar uma data informado DD/MM/AAAA (regex)
 * @returns {Boolean} Retorna true para uma data valida ou false para uma data inválida.
 */
async function validarData(testdate) {
  return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
    testdate
  );
}

/**
 * A partir de um link (URL) informado pelo usuário é gerado e gravado um novo Mini Link
 * @returns {String} Retorna texto de sucesso.
 */
const novoMiniLink = async (req, res, next) => {
  console.log("1");
  try {
    console.log("2");
    const id = gerarMiniLinkId();
    console.log(id);
    console.log("3");
    if (validarUrl(req.body.linkOriginal)) {
      console.log(id);
      console.log(req.body.linkOriginal);
      let miniLink = {
        miniLinkId: id,
        linkOriginal: req.body.linkOriginal,
        dataMiniLink: new Date().toLocaleDateString("pt-BR"),
        miniLink: gerarMiniLink(id),
      };
      console.log("5");
      await firestore.collection("miniLinks").doc().set(miniLink);
      console.log("6");
      res.send("MiniLink salvo com sucesso!");
      console.log("7");
    } else {
      console.log("8");
      res.status(404).send("Link inválido, informe o endereço completo.");
      console.log("9");
    }
    console.log("10");
  } catch (error) {
    console.log("11");
    res.status(400).send(error.message);
    console.log("12");
  }
};

/**
 * Listar todos os Mini Links existêntes na base.
 * @returns {JSON} Retorna JSON com os dados dos Mini Links localizados na base.
 */
const todosOsMiniLinks = async (req, res, next) => {
  try {
    const miniLinks = await firestore.collection("miniLinks");
    const data = await miniLinks.get();
    const miniLinksArray = [];
    if (data.empty) {
      res.status(404).send("Nenhum MiniLink foi localizado.");
    } else {
      data.forEach((doc) => {
        const miniLink = new MiniLink(
          doc.id,
          doc.data().miniLinkId,
          doc.data().linkOriginal,
          doc.data().dataMiniLink,
          doc.data().miniLink
        );
        miniLinksArray.push(miniLink);
      });
      res.send(miniLinksArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * A partir de um ID informado pelo usuário, retorna o Mini Link
 * @returns {String} Retorna o Mini Link.
 */
const miniLinkId = async (req, res, next) => {
  try {
    let miniLink = new MiniLink();
    const data = await firestore.collection("miniLinks").get();
    if (data.empty) {
      res.status(404).send("Nenhum MiniLink foi localizado.");
    } else {
      data.forEach((doc) => {
        if (doc.data().miniLinkId == req.params.id) {
          miniLink = doc.data();
        }
      });
      res.send(gerarMiniLink(miniLink.miniLinkId));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Abrir link original a partir de um Mini Link informado pelo usuário.
 * @returns {redirect} Redireciona o Mini Link para o URL original.
 */
const miniLink = async (req, res, next) => {
  try {
    let miniLink = new MiniLink();
    const data = await firestore.collection("miniLinks").get();
    if (data.empty) {
      res.status(404).send("Nenhum MiniLink foi localizado.");
    } else {
      data.forEach((doc) => {
        if (doc.data().miniLinkId == req.params.id) {
          miniLink = doc.data();
          res.redirect(miniLink.linkOriginal);
        }
      });
      if (miniLink.miniLinkId === undefined) {
        res.status(404).send("O MiniLink não foi localizado.");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Lista todos os Mini Links cadastrados em uma data informada pelo usuário.
 * @returns {String} Retorna os Mini Link de uma data cadastrada.
 */
const miniLinkData = async (req, res, next) => {
  try {
    let miniLink = new MiniLink();
    const miniLinks = await firestore.collection("miniLinks");
    const data = await miniLinks.get();
    const miniLinksArray = [];
    if (data.empty) {
      res.status(404).send("Nenhum MiniLink foi localizado.");
    } else {
      if (validarData(req.body.dataMiniLink)) {
        data.forEach((doc) => {
          if (doc.data().dataMiniLink == req.body.dataMiniLink) {
            miniLink = doc.data();
            miniLinksArray.push(miniLink.miniLink);
          }
        });
        if (miniLink.miniLinkId === undefined) {
          res
            .status(404)
            .send("Nenhum MiniLink foi localizado para a data informada.");
        } else {
          res.send(miniLinksArray);
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  miniLink,
  novoMiniLink,
  todosOsMiniLinks,
  miniLinkId,
  miniLinkData,
};
