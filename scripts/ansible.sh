#!/usr/bin/env bash

MACHINE="psique"
ROOT=$(dirname "$(readlink -f "$0")")
#DISTRO=$(lsb_release -c | awk '{print $2}' 2>/dev/null | tr -d ' ')

echo "Running Ansible playbook for $DISTRO"

if [[ $OSTYPE == darwin* ]] || [ "$(lsb_release -is)" == "Void" ] || [ "$(lsb_release -is)" == "Arch" ]; then
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG="${ROOT}/../ansible/ansible.cfg" \
  ansible-playbook -e "ansible_port=2200" "${ROOT}/../ansible/main.yml" -i $MACHINE,
else
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG="${ROOT}/../ansible/ansible.cfg" \
  ansible-playbook --connection=local -e "ansible_port=2200" "${ROOT}/../ansible/main.yml" -i localhost,
fi