import React, { useState, useEffect } from 'react';
import './RandomQuote.css';

const RandomQuote = () => {
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({
        text: "Life is what happens when you're busy making other plans.",
        author: "Allen Saunders",
    });
    const [searchAuthor, setSearchAuthor] = useState('');

    useEffect(() => {
        loadQuotes();
    }, []);

    async function loadQuotes() {
        try {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    }

    const random = () => {
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(selectedQuote);
    };

   
    const searchByAuthor = () => {
        if (searchAuthor.trim() !== '') { 
            const filteredQuotes = quotes.filter(q => q.author.toLowerCase().includes(searchAuthor.toLowerCase()));
            if (filteredQuotes.length > 0) {
                const selectedQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
                setQuote(selectedQuote);
            } else {
                alert("No quotes found for the author.");
            }
        } else {
            alert("Please enter an author's name.");
        }
    };
    

    return (
        <>
       
        <div className='quote-card'>
        <h1>Daily Quotes</h1>
            <div className="quote">{quote.text}</div>
            <div className='line'>
                <div className='bottom'>
                    
                    <div className='author'>- {quote.author.split(',')[0]}</div>
                    <div className='icon'>
                        <button onClick={random}>Random Quote</button>
                    </div>
                </div>
            </div>
            <div className="search">
                <input type="text" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} placeholder="Enter author's name" />
                <button onClick={searchByAuthor}>Search</button>
            </div>
        </div>
        </>
    );
};

export default RandomQuote;
