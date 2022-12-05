import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'
import axios from 'axios'

// TODO: need to code UI and logic after, just a copy now
export const ForgotPassword = () => {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  backgroundImage: {},
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    paddingHorizontal: '8%',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  inputsContainer: {
    paddingVertical: 30,
    width: '100%',
  },
  accountActions: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  accountActionText: {
    color: '#fff',
    fontSize: 13,
  },
})
