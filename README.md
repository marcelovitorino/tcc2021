# tcc2021

Desenvolvido por: Marcelo Vitorino

Data: 03/2021

Sistema de Hardware e Software para Monitoramento Estrutural de Edificações

Este repositório contém o código dos seguintes substistemas:

Subsistema de aquisição e processamento de dados.  Implementa a conexão da placa com o servidor web e o envio dos dados por meio de requisições HTTP. Nesse subsistema,  as seguintes variáveis são armazenadas na nuvem: acelerações x,y,z, Localização e Temperatura.


Subsistema de apresentação. Esse sistema foi implementado com um conjunto de classes estruturadas a partir do framework web React JavaScript. O código também realiza requisições HTTP para recuperar os dados armazenados na nuvem e apresentá-los na Dashboard.
