#!/data/data/com.termux/files/usr/bin/bash

# Variables de configuración
BOT_DIR="Admin-TK"
BOT_REPO="https://github.com/JJoan02/$BOT_DIR"
DB_FILE="database.json"

# Colores para la salida en consola
GREEN='\033[32m'
BOLD='\033[1m'
RESET='\033[0m'

# Función para iniciar el bot
start_bot() {
  echo -e "${BOLD}${GREEN}Iniciando $BOT_DIR...${RESET}"
  echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
  cd "$BOT_DIR" && npm start
}

# Función para clonar y configurar el repositorio
clone_and_setup_repo() {
  echo -e "${BOLD}${GREEN}Clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
  echo -e "${BOLD}${GREEN}Cloning repository \"$BOT_REPO\" into \"$HOME\"...\n${RESET}"
  cd && rm -rf "$BOT_DIR" && git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install && cd
}

# Función para mover el archivo de base de datos
move_db_file() {
  echo -e "${BOLD}${GREEN}Moviendo \"$DB_FILE\" a \"$HOME\"${RESET}"
  echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\"...\n${RESET}"
  mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME"
}

# Verifica si estamos en el directorio del bot
if [[ $(basename "$PWD") == "$BOT_DIR" ]]; then
  if [ -e "$DB_FILE" ]; then
    echo -e "${BOLD}${GREEN}Moviendo \"$DB_FILE\" a \"$HOME\" y clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
    echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning repository \"$BOT_REPO\" into \"$HOME\"...\n${RESET}"
    move_db_file
    clone_and_setup_repo
    if [ -e "$HOME/$DB_FILE" ]; then
      echo -e "${BOLD}${GREEN}Rescatando archivo \"$DB_FILE\" y moviéndolo a \"$BOT_DIR\".${RESET}"
      echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
      mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/"
      start_bot
    else
      echo -e "${BOLD}${GREEN}\"$DB_FILE\" no existe en \"$HOME\"${RESET}"
      echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\"\n${RESET}"
      start_bot
    fi
  else
    echo -e "${BOLD}${GREEN}\"$DB_FILE\" no se encontró en \"$BOT_DIR\", clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
    echo -e "${BOLD}${GREEN}\"$DB_FILE\" not found in \"$BOT_DIR\", cloning repository \"$BOT_REPO\" to \"$HOME\"...\n${RESET}"
    clone_and_setup_repo
    if [ -e "$HOME/$DB_FILE" ]; then
      echo -e "${BOLD}${GREEN}Rescatando archivo \"$DB_FILE\" y moviéndolo a \"$BOT_DIR\".${RESET}"
      echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
      mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/"
      start_bot
    else
      echo -e "${BOLD}${GREEN}\"$DB_FILE\" no existe en \"$HOME\"${RESET}"
      echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\"\n${RESET}"
      start_bot
    fi
  fi
else
  echo -e "${BOLD}${GREEN}Ubicación actual: \"$HOME\"${RESET}"
  echo -e "${BOLD}${GREEN}Current location: \"$HOME\"\n${RESET}"
  cd "$HOME"
  if [ -e "$HOME/$BOT_DIR" ]; then
    echo -e "${BOLD}${GREEN}Dirigiéndome a \"$BOT_DIR\".${RESET}"
    echo -e "${BOLD}${GREEN}Heading to \"$BOT_DIR\".\n${RESET}"
    cd "$HOME/$BOT_DIR"
    if [ -e "$HOME/$BOT_DIR/$DB_FILE" ]; then
      echo -e "${BOLD}${GREEN}Moviendo \"$DB_FILE\" a \"$HOME\" y clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
      echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning repository \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
      move_db_file
      clone_and_setup_repo
      if [ -e "$HOME/$DB_FILE" ]; then
        echo -e "${BOLD}${GREEN}Rescatando archivo \"$DB_FILE\" y moviéndolo a \"$BOT_DIR\".${RESET}"
        echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
        mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/"
        start_bot
      else
        echo -e "${BOLD}${GREEN}Dirigiéndome a \"$BOT_DIR\"...${RESET}"
        echo -e "${BOLD}${GREEN}Heading to \"$BOT_DIR\".\n${RESET}"
        start_bot
      fi
    else
      echo -e "${BOLD}${GREEN}\"$DB_FILE\" no existe, clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
      echo -e "${BOLD}${GREEN} \"$DB_FILE\" does not exist, cloning \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
      clone_and_setup_repo
      start_bot
    fi
  else
    echo -e "${BOLD}${GREEN}\"$BOT_DIR\" no existe, clonando repositorio \"$BOT_REPO\" en \"$HOME\"...${RESET}"
    echo -e "${BOLD}${GREEN} \"$BOT_DIR\" does not exist, cloning \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
    clone_and_setup_repo
    if [ -e "$HOME/$DB_FILE" ]; then
      echo -e "${BOLD}${GREEN}He encontrado un archivo \"$DB_FILE\" en \"$HOME\", lo moveré a \"$BOT_DIR\".${RESET}"
      echo -e "${BOLD}${GREEN}I have found a file \"$DB_FILE\" in \"$HOME\", moving it to \"$BOT_DIR\".\n${RESET}"
      mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/"
      start_bot
    else
      cd "$BOT_DIR"
      start_bot
    fi
  fi
fi
