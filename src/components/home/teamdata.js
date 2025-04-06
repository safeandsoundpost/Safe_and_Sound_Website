const teamData = [
    {
        name: "Michael Grainger",
        column: 2,
        order: 2,
        role: "Lead Sound Designer",
        pic: "mike",
        bio: `Born on a British Military base in the remote tundra of Canada, and growing up all over the world Michael settled down in Waterdown Ontario, Michael is passionate, attentive and one of the chillest guys you’ll meet.
Graduating with honours from the Ontario Institute of Audio Record Technology in 2021 at only 19 years old, Michael got his start in animation at one of Toronto’s top studios. He has done editing and sound design for shows such as Total Drama Island, Open season, Dylan and worked with almost every major company in the industry including Disney, Netflix, Audible, EOne.
When it comes to live action film, Mike has worked on a number of projects, elevating the production to the next level of quality, and always ensuring the film will make an impact in the theatre, and at home.`,
        favFilm: "Hot Fuzz",
        imdb: "https://www.imdb.com/name/nm14043487/?ref_=nv_sr_srsg_2_tt_0_nm_8_in_0_q_Michael%2520Grainger",
    },
    {
        name: "Chris Ma",
        column: 1,
        order: 1,
        role: "Lead Foley Artist & Editor",
        pic: "chris",
        bio: `Raised in Burlington Ontario, Chris quickly found of love for movies and TV at a young age. Starting out with Cartoon Network and eventually settling with Bingeworthy netflix shows.
He gained a particular interest in the foley aspect of production. This was due to his time at Fanshawe college where he took Music Industry Arts and Audio Post Production. There he was exposed to each facet of the post production industry.  
Now, Chris works effortlessly to provide his clients with excellent foley work. Some films he has worked on are, When You Know You Know, Diabolika and more.`,
        favFilm: "Spirited Away",
    },
    {
        name: "Jesse Lawrence",
        column: 2,
        order: 1,
        role: "Co-Owner / Re-Recording Mixer / Sound Supervisor",
        pic: "jesse",
        // eslint-disable-next-line quotes
        bio: 'Jesse Lawrence is a queer Métis audio engineer from Kelowna, British Columbia. Graduating at the top of his class from The Ontario Institute of Audio Recording Technology in 2021, Jesse has built a noteworthy career in the audio industry. He began his professional journey in Toronto, where he gained extensive experience at a leading sound studio, contributing to projects for prestigious clients such as A24, HBO, EOne, and Disney. Since 2022, Jesse has partnered with Thomas and together have been building Safe & Sound project by project. Jesse\'s expertise spans a wide range of audio disciplines, including sound supervision, sound design, foley artistry, and dialogue editing. His deep-seated respect and passion for film and audio production drives his commitment to excellence in every project he undertakes. "With every project, I am on a mission to enhance the story with sound, aiming to immerse the audience completely without distractions." Outside of his professional pursuits, Jesse enjoys traveling, making music, digging for records, and embracing the outdoors.',
        imdb: "https://www.imdb.com/name/nm14043486/?ref_=nv_sr_srsg_9_tt_0_nm_8_in_0_q_jesse%2520lawrence",
        favFilm: "Whiplash",
        filmLabel: "Not quite my tempo 🙅🏻‍♀️🥁",
    },
    {
        name: "Thom O Neil",
        column: 1,
        order: 0,
        role: "Co-Owner / Re-Recording Mixer / Sound Supervisor",
        pic: "thom",
        bio: "Thom O'Neil is a seasoned audio engineer and co-owner of Safe & Sound, bringing over six years of experience in audio post-production. He began his career in voiceover recording for animation, later expanding his skills to dubbing for anime and ADR for film and TV. Thom’s true passion lies in sound design and mixing, where he crafts immersive soundscapes that elevate every project. Thom has contributed to major productions with Disney, Lucasfilm, and Paramount, but finds his greatest fulfillment collaborating on independent films. His inventive approach in the studio allows him to create one-of-a-kind soundtracks that resonate with both storytellers and audiences. “There’s always something to learn from every person you meet, no matter their experience, and I believe we all have the opportunity to share knowledge and positively impact those around us.”",
        imdb: "https://www.imdb.com/name/nm8707755/",
        favFilm: "Good Time",
        actualFavFilm: "Paw Patrol: The Movie",
    },
    {
        name: "Kyle Blaseg",
        column: 1,
        order: 2,
        role: "Co-Founder & Composer",
        pic: "kyle",
        bio: `Born and raised in Northern Ontario, Kyle has been playing and composing music his whole life. He studied music composition at Western University and graduated top of his class at the Ontario Institute of Audio Recording Technology. Kyle has had a passion for film composition since he was young. Being inspired by the industry’s greats, such as John Williams and Hans Zimmer, Kyle has learned to hone his skills to bring films alive with his music!

“Nothing brings me more joy than bringing a director's vision to life!”`,
        favFilm: "Perfume: Story of a Murderer",
        filmLabel: "👃👩☠️",
    },
    {
        name: "Kanchan Mahadik",
        column: 1,
        order: 3,
        role: "Marketing & Business Development Strategist",
        pic: "kanchan",
        bio: "Kanchan brings a strong background in film and television production, specializing in business affairs, contract negotiations, and production financing. At Safe and Sound Post, she manages legal agreements and partnerships, ensuring seamless operations that support the studio’s growth. A recent graduate of Centennial College’s Business, Film &amp; TV program, Kanchan combines industry knowledge with a keen understanding of funding models and media law—expertise that helps Safe and Sound Post navigate the evolving entertainment landscape. Passionate about storytelling, resilience, and innovation, she is also developing her debut documentary while actively supporting creative projects. With a commitment to fostering a thriving sound production community, she aims to position Safe and Sound Post as a trusted and reliable leading hub for sound production in Canada.",
        favFilm: "Before Sunrise",
        imdb: "https://www.imdb.com/name/nm12073225/",
    },
    {
        name: "Ember Dean",
        column: 2,
        order: 5,
        role: "Sound Designer",
        pic: "ember",
        bio: "I am an audio post-production professional with a passion for sound and storytelling. I graduated from Fanshawe College, where I honed my skills and discovered my love for audio in the film and gaming industries. What started as a fascination with music and video games has grown into a fulfilling career, allowing me to work on diverse projects and collaborate with incredible people along the way. Driven by a commitment to excellence, I constantly push myself to expand my skillset and contribute to the creative process. I find joy in transforming soundscapes to enhance storytelling, and I am proud to be part of a talented team that shares my passion. With a hard-working mindset and a love for both film and music, I am dedicated to delivering high-quality work and continuing my journey in the world of audio post-production.",
        favFilm: "How to train your dragon",
        imdb: "https://m.imdb.com/name/nm16290725/?ref_=ext_shr_lnk",
        filmLabel: "🐲❌🦷",
        filmLink: "https://www.youtube.com/shorts/f-uIfc0hAnU?feature=share",
    },
    {
        name: "Fardin Mullan",
        column: 1,
        order: 4,
        role: "Sound Designer",
        pic: "fardin",
        bio: "Fardin Mullan is a Sound Specialist dedicated to crafting powerful, high-fidelity audio experiences—whether through headphones, home theatres, or sound quality (SQ) car systems. With a passion for immersive sound and a deep technical foundation, he ensures that every project reaches its full sonic potential. His expertise spans the entire spectrum of audio production, from location sound and ambience recording to audio post-production and DSP tuning. Whether capturing authentic on-set dialogue, designing rich soundscapes, or fine-tuning car audio systems for precise staging, Fardin brings a meticulous approach to every project. Fardin’s journey into sound was fueled by a deep love for movies and music. Experiencing Fanshawe College’s 7.1.4 Dolby Atmos system expanded his fascination with spatial audio, sparking the question: Could Atmos exist in a car? This curiosity led him deeper into DSP tuning and immersive sound design, bridging the gap between cinema-quality audio and precision car audio engineering. His work can be heard in feature films, short films, TV series, and PSAs, collaborating with both independent filmmakers and established production teams. Fardin sees sound as more than just an element of production—it’s a powerful storytelling tool that shapes emotion, atmosphere, and immersion.",
        favFilm: "The Lion King (1994)",
        filmLabel: "The king has returned 🦁",
    },
    {
        name: "Vanessa Hannah",
        column: 2,
        order: 3,
        role: "Sound Designer / Dialogue Editor",
        pic: "vanessa",
        bio: "Graduating from the Broadcast Television/Videography program at Humber College in 2016, at 19 years old, Vanessa acquired a full time position at a post production facility where she worked for 6 and a half years as a mastering/QC technician. She worked 2 and a half years at a different facility as a mastering/QC technician and is now using her skill set in the world of audio engineering, bringing creative flair into the projects she works on, something she was missing in the world of mastering. She has a passion for sound design and editing aiming for an immersive and moving experience for audiences. Known for her attention to detail, she takes the time and effort to meet the highest of standards and quality every project deserves.",
        favFilm: "Shaun Of The Dead",
        filmLabel: "🏏🍺🧟‍♂️"
    },
    {
        name: "Jonah Gillespie",
        column: 2,
        order: 4,
        role: "Foley Artist / Dialogue Editor",
        pic: "jonah",
        // eslint-disable-next-line quotes
        bio: `Jonah Gillespie is a Dialog Editor and Foley Artist with a keen ear for the unseen rhythms of film. Over 3+ years in the industry, he’s shaped the sonic landscapes of projects like the offbeat comedy "Operation Taco Gary", "Racewalkers", and the road-trip thriller "Drive Back Home".  A Burlington native, Jonah originally studied music—a background that informs his meticulous approach to sound. Whether cleaning up dialogue for clarity or crafting Foley that feels alive, he treats every film like a composition, balancing technical precision with instinctive storytelling.  When he’s not syncing footsteps or chasing the perfect room tone, you’ll find him Rock Climbing or Opening Pokémon Packs on his phone.`,
        favFilm: "Scott Pilgrim vs The World",
        filmLabel: "👦👊🎸",
    },
];

export default teamData;
