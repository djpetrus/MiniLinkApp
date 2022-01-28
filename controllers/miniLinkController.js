"use strict";

const firebase = require("../db");
const MiniLink = require("../models/miniLink");
const firestore = firebase.firestore();
const config = require("../config");

async function gerarMiniLinkId() {
  let id = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
}

async function gerarMiniLink(id) {
  return config.url + "/" + id;
}

const novoMiniLink = async (req, res, next) => {
  try {
    const id = await gerarMiniLinkId();
    if (await validarUrl(req.body.linkOriginal)) {
      let miniLink = {
        miniLinkId: id,
        linkOriginal: req.body.linkOriginal,
        dataMiniLink: new Date().toLocaleDateString("pt-BR"),
        miniLink: await gerarMiniLink(id),
      };
      await firestore.collection("miniLinks").doc().set(miniLink);
      res.send("MiniLink salvo com sucesso!");
    } else {
      res.status(404).send("Link inválido, informe o endereço completo.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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
      res.send(await gerarMiniLink(miniLink.miniLinkId));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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

const miniLinkData = async (req, res, next) => {
  try {
    let miniLink = new MiniLink();
    const miniLinks = await firestore.collection("miniLinks");
    const data = await miniLinks.get();
    const miniLinksArray = [];
    if (data.empty) {
      res.status(404).send("Nenhum MiniLink foi localizado.");
    } else {
      if (await validarData(req.body.dataMiniLink)) {
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

async function validarUrl(url) {
  return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
    url
  );
}

async function validarData(testdate) {
  return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
    testdate
  );
}

module.exports = {
  miniLink,
  novoMiniLink,
  todosOsMiniLinks,
  miniLinkId,
  miniLinkData,
};
