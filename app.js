const uri = "mongodb+srv://joseffeik:uVLSKK3cjmK2wMwm@cluster0.sc5dtj5.mongodb.net/Task-Tracking-System?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const express = require('express');
const app = express();
const Port = 3000;

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});


// MongoDB-Verbindung herstellen
mongoose.connect("mongodb+srv://joseffeik:uVLSKK3cjmK2wMwm@cluster0.sc5dtj5.mongodb.net/Task-Tracking-System?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Mit MongoDB verbunden');
}).catch((err) => {
    console.error('Verbindung zu MongoDB konnte nicht hergestellt werden', err);
});



const aufgabenSchema = new Schema({
  Titel: { type: String, required: true, maxLength: 100 },
  Beschreibung: { type: String, maxLength: 100 },
  Erstellungsdatum: { type: Date, Standard: Date.now },
  Fälligkeitsdatum: { typr: Date },
  Status: { type: String, Standard: 'offen', maxLength: 100 }
});

const Aufgaben = mongoose.model('Tasks', aufgabenSchema); "Aufgaben"

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Herzlich Willkommen');
});
  
// GET-Route zum Erhalten aller Aufgaben
app.get('/aufgaben', async (req, res) => {
    try{
      // Alle Aufgaben aus der Datenbank abrufen
      const aufgaben = await Aufgaben.find();
  
      // Erfolgsantwort mit den abgerufenen Aufgaben senden
      res.status(200).json({ success: true, data: aufgaben });
    } catch (Fehler) {
      // Bei einem Fehler sende eine Fehlerantwort
      res.status(500).json({ success: false, error: error.message });
    }
});
  
