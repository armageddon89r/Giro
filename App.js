import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

import { DataStore } from '@aws-amplify/datastore';
import { Photo } from './src/models';
import { Person } from './src/models';

import React from 'react';

Amplify.configure(awsconfig)

const DataFetch = () => {
  return (
    <SafeAreaView>
      <Button
        title="Fetch users"
        onPress={async () => {
          const persons = await DataStore.query(Person);
          console.log(persons);
        }} 
      />
      <Button>
        title="Fetch photos"
        onPress={async () => {
          const photos = await DataStore.query(Photo);
          console.log(photos)
        }}
      </Button>
    </SafeAreaView>
  )
}

const PersonInput = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [username, setUsername] = React.useState('');

  return (
    <SafeAreaView>
      <View style={{
          flexDirection: 'row'
        }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setSurname}
          value={surname}
          placeholder="Surname"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
      </View>
      <Button
        title="Submit"
        onPress={async () => {
          console.log(surname)
          console.log(name)
          console.log(username)

          await DataStore.save(
            new Person({
            "name": `$name`,
            "surname": `$surname`,
            "user": `username`,
          })
          );
        }} 
      />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <PersonInput />
      <DataFetch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
