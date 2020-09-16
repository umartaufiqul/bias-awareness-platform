#!/bin/bash

sudo adduser $1

sudo mkdir /home/$1/.jupyter
sudo cp ~/.jupyter/jupyter_notebook_config.py /home/$1/.jupyter/

sudo chown $1:$1 /home/$1/.jupyter
sudo chown $1:$1 /home/$1/.jupyter/jupyter_notebook_config.py

sudo cp -rp ./distribute/* /home/$1/
sudo chown $1:$1 /home/$1/*

sudo chmod 700 /home/$1
