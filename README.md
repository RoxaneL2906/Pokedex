## Pokedex

Application web de consultation des Pokémons via l'API PokeBuild.

> ⚠️ **API indisponible** : Ce projet utilise `pokebuildapi.fr` qui est actuellement hors service. L'application s'affiche mais les Pokémons ne se chargent pas.

## Programme
JavaScript - Fetch API

## Prérequis
- Git (pour cloner le dépôt)
- Docker (pour la version conteneurisée)
- Un navigateur moderne

## Installation & Configuration

### En local
Cloner le projet et ouvrir `index.html` dans votre navigateur.

### Avec Docker
```bash
docker build -t pokedex-app .
docker run -p 8085:80 --name pokedex-app pokedex-app
```
Ouvrir http://localhost:8085

## Port
| Hôte | Conteneur |
|------|-----------|
| 8085 | 80        |