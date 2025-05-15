# Macro Masters - Food Nutrition Tracker

A mobile application that helps users track their food intake and nutritional information. The app features food image classification and detailed nutrition tracking capabilities.

## Features

- 🍎 Food Image Classification
- 📊 Detailed Nutrition Information
- 🔍 Food Search Functionality
- 📱 Modern, Responsive UI
- 📈 Calorie Tracking

## App Architecture
![Screenshot 2025-05-06 175022](https://github.com/user-attachments/assets/62664747-9910-439a-906f-b829d89abf71)


## Tech Stack

### Frontend
- React Native
- Expo
- TypeScript
- AsyncStorage for local data persistence

### Backend
- Python
- Flask
- TensorFlow
- InceptionV3 for image classification

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- On macOS/Linux:
```bash
source venv/bin/activate
```
- On Windows:
```bash
.\venv\Scripts\activate
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Download the classification model:
```bash
cd src
python download_model.py
```

6. Start the Flask server:
```bash
python app.py
```

## Project Structure

```
├── frontend/
│   ├── app/              # Main application code
│   ├── components/       # Reusable components
│   ├── assets/          # Images and static files
│   └── package.json     # Frontend dependencies
│
└── backend/
    ├── src/             # Backend source code
    ├── classification_model/  # ML model storage
    └── requirements.txt  # Python dependencies
```

## Usage

1. **Home Tab**
   - Search for food items
   - View nutrition information
   - Track daily intake

2. **Image Tab**
   - Upload food images
   - Get instant classification
   - View nutrition details

3. **Progress Tab**
   - Track daily calories
   - View nutrition history
   - Monitor progress

## Development

- Frontend runs on port 8080 (Expo)
- Backend runs on port 8080 (Flask + Springboot)
- Ensure both servers are running for full functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Authors:

Mann Talati (Machine Learning/Frontend)

Samarth Nadgir (Frontend/Backend)

Prerith Arunkumar (Frontend/Backend)

Anvith Kotha (Frontend)
