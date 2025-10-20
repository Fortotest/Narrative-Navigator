# **App Name**: Narrative Navigator

## Core Features:

- User Authentication: Secure user login and registration using Google authentication via Firebase.
- Watchlist Management: Users can add and remove crypto assets from their personal watchlist, stored in Firestore.
- Real-time Market Data: Fetch and display real-time market data for cryptocurrencies using the CoinGecko API, served by a Firebase Function and managed with SWR for efficient data fetching and caching.
- Personalized Narrative Tool: Generative AI tool that suggests relevant narratives and insights related to assets in the user's watchlist. Uses current market data and news feeds to produce short summaries. Uses a tool to decide what is relevant.
- Loading and Error Handling: Display loading spinners and error messages to provide feedback during data fetching and user interactions.
- User Profile: Display user profile information, including avatar and username.

## Style Guidelines:

- Primary color: Vibrant purple (#7F56D9) to convey innovation and sophistication.
- Background color: Light gray (#F5F3FF), a very desaturated purple, to provide a clean and modern backdrop.
- Accent color: Electric blue (#5046E5) to highlight interactive elements and calls to action.
- Body and headline font: 'Inter', a grotesque-style sans-serif font with a modern, neutral look suitable for both headlines and body text.
- Use a set of consistent, modern icons (e.g. Phosphor icons) to represent different crypto narratives and functionalities.
- Implement a clean and intuitive layout, with a sidebar for navigation and clear sections for market data and user watchlist.
- Subtle transitions and animations to enhance user experience, such as loading animations and smooth transitions between different sections.