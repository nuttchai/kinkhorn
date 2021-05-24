#!/bin/sh
sudo cp /etc/kubernetes/admin.conf $HOME/
sudo chown  $(id -u) $HOME/admin.conf
export KUBECONFIG=$HOME/admin.conf