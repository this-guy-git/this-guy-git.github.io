// Interactive functionality
let currentChapter = 0;
let progress = {
    chaptersCompleted: 0,
    exercisesSolved: 0,
    projectsBuilt: 0,
    quizzesPassed: 0
};
// Quiz data for each chapter (expanded with more questions)
const chapterQuizzes = {
    1: [
        {
            question: "What does the 'print' function do in Lumen?",
            options: [
                "Displays text on the screen",
                "Prints to a physical printer",
                "Creates a new variable",
                "Imports a library"
            ],
            correct: 0
        },
        {
            question: "Which symbol ends a statement in Lumen?",
            options: [
                "Period (.)",
                "Colon (:)",
                "Semicolon (;)",
                "Comma (,)"
            ],
            correct: 2
        },
        {
            question: "What is the correct way to write 'Hello, World!' in Lumen?",
            options: [
                'print "Hello, World!"',
                'echo "Hello, World!"',
                'console.log("Hello, World!")',
                'display("Hello, World!")'
            ],
            correct: 0
        },
        {
            question: "What is the first step in creating a Lumen program?",
            options: [
                "Create a file with .lmn extension",
                "Install a special IDE",
                "Compile the program",
                "Run the program"
            ],
            correct: 0
        },
        {
            question: "How do you run a compiled Lumen program?",
            options: [
                "Execute the generated executable",
                "Use the lumen run command",
                "Open it in a web browser",
                "Import it as a module"
            ],
            correct: 0
        }
    ],
    2: [
        {
            question: "Which keyword declares an integer variable in Lumen?",
            options: [
                "int",
                "integer",
                "num",
                "number"
            ],
            correct: 0
        },
        {
            question: "What data type would you use for true/false values?",
            options: [
                "int",
                "str",
                "bool",
                "var"
            ],
            correct: 2
        },
        {
            question: "Which variable type can hold any data type in Lumen?",
            options: [
                "int",
                "str",
                "bool",
                "var"
            ],
            correct: 3
        },
        {
            question: "How do you declare a constant value in Lumen?",
            options: [
                "Using the 'const' keyword",
                "Using the 'static' keyword",
                "Using the 'final' keyword",
                "Using the 'fixed' keyword"
            ],
            correct: 1
        },
        {
            question: "Which of these is a valid variable name in Lumen?",
            options: [
                "2ndPlace",
                "first-name",
                "_count",
                "full name"
            ],
            correct: 2
        }
    ],
    3: [
        {
            question: "How do you print multiple values in one print statement?",
            options: [
                "Using the + operator",
                "Separating them with commas",
                "Using multiple print statements",
                "Using the & operator"
            ],
            correct: 1
        },
        {
            question: "Which of these is a valid Lumen print statement?",
            options: [
                'print "Name: " + name',
                'print "Name: ", name',
                'print("Name: " + name)',
                'echo "Name: ", name'
            ],
            correct: 1
        },
        {
            question: "What will 'print \"Value: \", 42;' output?",
            options: [
                "Value: 42",
                "Value: ,42",
                "Value:42",
                "It will cause an error"
            ],
            correct: 0
        },
        {
            question: "How can you format numbers in Lumen output?",
            options: [
                "Using the format() function",
                "Using special formatting characters",
                "Lumen doesn't support number formatting",
                "Using the printf function"
            ],
            correct: 2
        },
        {
            question: "What is the purpose of the STDIO library in Lumen?",
            options: [
                "To handle mathematical operations",
                "To provide input/output functionality",
                "To work with dates and times",
                "To generate random numbers"
            ],
            correct: 1
        }
    ],
    4: [
        {
            question: "How do you define a function in Lumen?",
            options: [
                "function myFunc() {}",
                "def myFunc():",
                "fun myFunc() {}",
                "func myFunc() {}"
            ],
            correct: 2
        },
        {
            question: "How do you return a value from a function?",
            options: [
                "Using the 'return' keyword",
                "Using the 'output' keyword",
                "Using the 'result' keyword",
                "The last expression is automatically returned"
            ],
            correct: 0
        },
        {
            question: "What is a parameter in a function?",
            options: [
                "The value returned by the function",
                "A variable that holds the function's name",
                "A value passed into the function",
                "The type of value the function returns"
            ],
            correct: 2
        },
        {
            question: "How do you call a function named 'calculate'?",
            options: [
                "call calculate();",
                "calculate;",
                "calculate();",
                "run calculate();"
            ],
            correct: 2
        },
        {
            question: "What is the purpose of function parameters?",
            options: [
                "To make functions run faster",
                "To allow functions to accept input values",
                "To determine what type of value the function returns",
                "To make the function name more descriptive"
            ],
            correct: 1
        }
    ],
    5: [
        {
            question: "Which keyword is used for conditional statements in Lumen?",
            options: [
                "if",
                "when",
                "check",
                "condition"
            ],
            correct: 0
        },
        {
            question: "What is the correct syntax for an if statement?",
            options: [
                "if (condition) then",
                "if condition:",
                "if (condition) {}",
                "if { condition }"
            ],
            correct: 2
        },
        {
            question: "Which operator checks if two values are equal?",
            options: [
                "=",
                "==",
                "===",
                "!="
            ],
            correct: 1
        },
        {
            question: "What does the 'else' keyword do?",
            options: [
                "Ends a conditional block",
                "Provides code to run when the condition is false",
                "Checks another condition",
                "Makes the condition optional"
            ],
            correct: 1
        },
        {
            question: "Which operator represents logical AND?",
            options: [
                "&",
                "&&",
                "|",
                "||"
            ],
            correct: 1
        }
    ]
};
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizScore = 0;
// Chapter content data
const chapters = {
    1: {
        title: "Chapter 1: Getting Started",
        content: `
                    <h3>Getting Started with Lumen</h3>
                    <p>Welcome to Lumen! Let's write your very first program and understand how compilation works.</p>
                    
                    <h4>Your First Program</h4>
                    <div class="code-example">
                        <pre><code><span class="function">print</span> <span class="string">"Hello, World!"</span>;</code></pre>
                    </div>
                    
                    <p><strong>What's happening here?</strong></p>
                    <ul>
                        <li><code>print</code> - Built-in function to display text</li>
                        <li><code>"Hello, World!"</code> - A string (text) in double quotes</li>
                        <li><code>;</code> - Semicolon ends the statement</li>
                    </ul>

                    <h4>Understanding Compilation</h4>
                    <p>Unlike Python or JavaScript, Lumen is <strong>compiled</strong>:</p>
                    <div class="code-example">
                        <pre><code>Source code (.lmn) → Parser → Python → PyInstaller → Executable
hello.lmn → hello.py → hello (executable)</code></pre>
                    </div>

                    <h4>Try It Yourself</h4>
                    <ol>
                        <li>Create a file called <code>hello.lmn</code></li>
                        <li>Type: <code>print "Hello, World!";</code></li>
                        <li>Compile and run: <code>lumen hello.lmn -d -p -c</code></li>
                    </ol>
                    
                    <div class="exercise">
                        <h4>🎯 Exercise 1.1</h4>
                        <p>Create a program that prints your name and favorite hobby.</p>
                        <button class="btn btn-secondary solution-btn" data-chapter="1">Show Solution</button>
                        <div id="solution-1" class="solution-content" style="display: none; margin-top: 1rem;">
                            <div class="code-example">
                                <pre><code><span class="function">print</span> <span class="string">"My name is Alice"</span>;
<span class="function">print</span> <span class="string">"I love programming!"</span>;</code></pre>
                            </div>
                        </div>
                    </div>
                `
            },
            2: {
                title: "Chapter 2: Variables & Data Types",
                content: `
                    <h3>Variables and Data Types</h3>
                    <p>Learn to store and work with different types of data in Lumen.</p>
                    
                    <h4>Basic Variable Types</h4>
                    <div class="code-example">
                        <pre><code><span class="keyword">int</span> age <span class="number">25</span>;
<span class="keyword">str</span> name <span class="string">"Alice"</span>;
<span class="keyword">bool</span> isStudent <span class="keyword">True</span>;

<span class="function">print</span> <span class="string">"Name:"</span>, name;
<span class="function">print</span> <span class="string">"Age:"</span>, age;
<span class="function">print</span> <span class="string">"Student:"</span>, isStudent;</code></pre>
                    </div>

                    <p><strong>Key Points:</strong></p>
                    <ul>
                        <li><code>int</code> - Whole numbers</li>
                        <li><code>str</code> - Text (strings)</li>
                        <li><code>bool</code> - True/False values</li>
                        <li>Variables must be declared with a type</li>
                    </ul>

                    <h4>Special Types</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Dynamic - can hold any type</span>
<span class="keyword">var</span> flexible <span class="number">100</span>;
flexible <span class="string">"Now I'm text!"</span>;

<span class="comment">// Static - cannot be changed</span>
<span class="keyword">static var</span> PI <span class="number">3.14159</span>;</code></pre>
                    </div>
                    
                    <div class="exercise">
                        <h4>🎯 Exercise 2.1</h4>
                        <p>Create variables for a character in a video game: name, level, health, and hasShield.</p>
                        <button class="btn btn-secondary solution-btn" data-chapter="2">Show Solution</button>
                        <div id="solution-2" class="solution-content" style="display: none; margin-top: 1rem;">
                            <div class="code-example">
                                <pre><code><span class="keyword">str</span> characterName <span class="string">"DragonSlayer"</span>;
<span class="keyword">int</span> level <span class="number">15</span>;
<span class="keyword">int</span> health <span class="number">100</span>;
<span class="keyword">bool</span> hasShield <span class="keyword">True</span>;

<span class="function">print</span> <span class="string">"Character:"</span>, characterName;
<span class="function">print</span> <span class="string">"Level:"</span>, level;
<span class="function">print</span> <span class="string">"Health:"</span>, health;
<span class="function">print</span> <span class="string">"Has shield:"</span>, hasShield;</code></pre>
                            </div>
                        </div>
                    </div>
                `
            },
            3: {
                title: "Chapter 3: Input & Output",
                content: `
                    <h3>Printing and Basic Output</h3>
                    <p>Learn different ways to display information in Lumen.</p>
                    
                    <h4>Different Ways to Print</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Simple text</span>
<span class="function">print</span> <span class="string">"Hello!"</span>;

<span class="comment">// Multiple values</span>
<span class="function">print</span> <span class="string">"Name:"</span>, <span class="string">"Alice"</span>, <span class="string">"Age:"</span>, <span class="number">25</span>;

<span class="comment">// Variables</span>
<span class="keyword">str</span> name <span class="string">"Bob"</span>;
<span class="keyword">int</span> score <span class="number">95</span>;
<span class="function">print</span> name, <span class="string">"scored"</span>, score, <span class="string">"points"</span>;</code></pre>
                    </div>
                    
                    <div class="exercise">
                        <h4>🎯 Exercise 3.1</h4>
                        <p>Create a program that displays a restaurant menu item with name, price, and description.</p>
                        <button class="btn btn-secondary solution-btn" data-chapter="3">Show Solution</button>
                        <div id="solution-3" class="solution-content" style="display: none; margin-top: 1rem;">
                            <div class="code-example">
                                <pre><code><span class="keyword">str</span> itemName <span class="string">"Margherita Pizza"</span>;
<span class="keyword">int</span> price <span class="number">12</span>;
<span class="keyword">str</span> description <span class="string">"Fresh tomatoes, mozzarella, and basil"</span>;

<span class="function">print</span> <span class="string">"=== MENU ITEM ==="</span>;
<span class="function">print</span> <span class="string">"Item:"</span>, itemName;
<span class="function">print</span> <span class="string">"Price: $"</span>, price;
<span class="function">print</span> <span class="string">"Description:"</span>, description;
<span class="function">print</span> <span class="string">"================"</span>;</code></pre>
                            </div>
                        </div>
                    </div>
                `
            },
            4: {
                title: "Chapter 4: Functions",
                content: `
                    <h3>Functions - Your First Building Blocks</h3>
                    <p>Functions let you reuse code and organize your program.</p>
                    
                    <h4>Creating Simple Functions</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Define a function</span>
<span class="keyword">fun</span> greet() {
    <span class="function">print</span> <span class="string">"Hello from my function!"</span>;
};

<span class="comment">// Use the function</span>
greet();
greet();  <span class="comment">// Can call it multiple times</span></code></pre>
                    </div>

                    <h4>Functions with Parameters</h4>
                    <div class="code-example">
                        <pre><code><span class="keyword">fun</span> greetPerson(name) {
    <span class="function">print</span> <span class="string">"Hello, "</span>, name, <span class="string">"!"</span>;
};

<span class="keyword">fun</span> addNumbers(a, b) {
    <span class="keyword">var</span> result a + b;
    <span class="function">print</span> a, <span class="string">" + "</span>, b, <span class="string">" = "</span>, result;
};

<span class="comment">// Using the functions</span>
greetPerson(<span class="string">"Alice"</span>);
greetPerson(<span class="string">"Bob"</span>);
addNumbers(<span class="number">5</span>, <span class="number">3</span>);
addNumbers(<span class="number">10</span>, <span class="number">25</span>);</code></pre>
                    </div>
                    
                    <div class="exercise">
                        <h4>🎯 Exercise 4.1</h4>
                        <p>Create a function that calculates and returns the price with tax.</p>
                        <button class="btn btn-secondary solution-btn" data-chapter="4">Show Solution</button>
                        <div id="solution-4" class="solution-content" style="display: none; margin-top: 1rem;">
                            <div class="code-example">
                                <pre><code><span class="keyword">fun</span> calculateTotal(price, taxRate) {
    <span class="keyword">var</span> tax price * taxRate;
    <span class="keyword">var</span> total price + tax;
    <span class="keyword">return</span> total;
};

<span class="keyword">var</span> itemPrice <span class="number">50</span>;
<span class="keyword">var</span> tax <span class="number">0.08</span>;  <span class="comment">// 8% tax</span>
<span class="keyword">var</span> finalPrice calculateTotal(itemPrice, tax);

<span class="function">print</span> <span class="string">"Item price: $"</span>, itemPrice;
<span class="function">print</span> <span class="string">"Tax rate: "</span>, tax * <span class="number">100</span>, <span class="string">"%"</span>;
<span class="function">print</span> <span class="string">"Final price: $"</span>, finalPrice;</code></pre>
                            </div>
                        </div>
                    </div>
                `
            },
            5: {
                title: "Chapter 5: Control Flow",
                content: `
                    <h3>Making Decisions with If Statements</h3>
                    <p>Control the flow of your program based on conditions.</p>
                    
                    <h4>Basic If Statements</h4>
                    <div class="code-example">
                        <pre><code><span class="keyword">int</span> temperature <span class="number">25</span>;

<span class="keyword">if</span> (temperature > <span class="number">30</span>) {
    <span class="function">print</span> <span class="string">"It's hot outside!"</span>;
};

<span class="keyword">if</span> (temperature < <span class="number">10</span>) {
    <span class="function">print</span> <span class="string">"It's cold outside!"</span>;
};

<span class="keyword">if</span> (temperature >= <span class="number">15</span>) {
    <span class="function">print</span> <span class="string">"Nice weather for a walk!"</span>;
};</code></pre>
                    </div>
                    
                    <div class="exercise">
                        <h4>🎯 Exercise 5.1</h4>
                        <p>Create a simple password strength checker.</p>
                        <button class="btn btn-secondary solution-btn" data-chapter="5">Show Solution</button>
                        <div id="solution-5" class="solution-content" style="display: none; margin-top: 1rem;">
                            <div class="code-example">
                                <pre><code><span class="keyword">str</span> password <span class="string">"mypass123"</span>;
<span class="keyword">var</span> length <span class="number">9</span>;  <span class="comment">// Assume we calculated the length</span>

<span class="keyword">if</span> (length >= <span class="number">12</span>) {
    <span class="function">print</span> <span class="string">"Password strength: Very Strong"</span>;
}; <span class="keyword">if</span> (length >= <span class="number">8</span>) {
    <span class="function">print</span> <span class="string">"Password strength: Strong"</span>;
}; <span class="keyword">if</span> (length >= <span class="number">6</span>) {
    <span class="function">print</span> <span class="string">"Password strength: Weak"</span>;
}; <span class="keyword">if</span> (length < <span class="number">6</span>) {
    <span class="function">print</span> <span class="string">"Password strength: Very Weak"</span>;
};

<span class="function">print</span> <span class="string">"Password length: "</span>, length, <span class="string">" characters"</span>;</code></pre>
                            </div>
                        </div>
                    </div>
                `
            }
        };

        const projects = {
            'task-manager': {
                title: "Personal Task Manager",
                content: `
                    <h3>Project: Personal Task Manager</h3>
                    <p>Build a complete productivity application with the following features:</p>
                    
                    <h4>Features to Implement</h4>
                    <ul>
                        <li>Add new tasks with descriptions</li>
                        <li>Mark tasks as complete/incomplete</li>
                        <li>View all tasks in a formatted list</li>
                        <li>Save tasks to a file for persistence</li>
                        <li>Load tasks when the program starts</li>
                        <li>Display completion statistics</li>
                    </ul>

                    <h4>Starter Code</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Task Manager - Starter Code</span>
<span class="keyword">#include</span> &lt;STDIO&gt;;
<span class="keyword">#include</span> &lt;DATE&gt;;

<span class="comment">// Create a task structure</span>
<span class="keyword">fun</span> createTask(description) {
    <span class="keyword">dic</span> task{
        <span class="string">"description"</span>: description;
        <span class="string">"completed"</span>: <span class="keyword">False</span>;
        <span class="string">"created"</span>: date.now();
    };
    <span class="keyword">return</span> task;
};

<span class="comment">// Your code here...</span></code></pre>
                    </div>
                `
            },
            'guessing-game': {
                title: "Number Guessing Game",
                content: `
                    <h3>Project: Number Guessing Game</h3>
                    <p>Create an interactive guessing game with multiple difficulty levels.</p>
                    
                    <h4>Game Features</h4>
                    <ul>
                        <li>Random number generation</li>
                        <li>Multiple difficulty levels (Easy, Medium, Hard)</li>
                        <li>Limited attempts based on difficulty</li>
                        <li>Hints (too high, too low, getting warmer)</li>
                        <li>Score tracking and high scores</li>
                        <li>Play again functionality</li>
                    </ul>

                    <h4>Starter Code</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Number Guessing Game</span>
<span class="keyword">#include</span> &lt;RANDOM&gt;;
<span class="keyword">#include</span> &lt;STDIO&gt;;

<span class="keyword">fun</span> playGame(maxNumber, maxAttempts) {
    <span class="keyword">var</span> secretNumber random.randint(<span class="number">1</span>, maxNumber);
    <span class="keyword">var</span> attempts <span class="number">0</span>;
    <span class="keyword">var</span> hasWon <span class="keyword">False</span>;
    
    <span class="comment">// Game loop goes here...</span>
};

<span class="comment">// Start your game implementation...</span></code></pre>
                    </div>
                `
            },
            'calculator': {
                title: "Scientific Calculator",
                content: `
                    <h3>Project: Scientific Calculator</h3>
                    <p>Build an advanced calculator with mathematical functions and expression evaluation.</p>
                    
                    <h4>Features to Implement</h4>
                    <ul>
                        <li>Basic arithmetic operations (+, -, *, /)</li>
                        <li>Advanced math functions (sin, cos, tan, log, sqrt)</li>
                        <li>Memory functions (store, recall, clear)</li>
                        <li>History of calculations</li>
                        <li>Parentheses for complex expressions</li>
                    </ul>

                    <h4>Starter Code</h4>
                    <div class="code-example">
                        <pre><code><span class="comment">// Scientific Calculator</span>
<span class="keyword">#include</span> &lt;MATH&gt;;
<span class="keyword">#include</span> &lt;STDIO&gt;;

<span class="comment">// Function to evaluate mathematical expressions</span>
<span class="keyword">fun</span> evaluateExpression(expression) {
    <span class="comment">// This would contain the logic to parse and evaluate expressions</span>
    <span class="comment">// For simplicity, we'll use a basic approach here</span>
    <span class="keyword">return</span> math.eval(expression);
};

<span class="comment">// Main calculator loop</span>
<span class="keyword">fun</span> runCalculator() {
    <span class="function">print</span> <span class="string">"=== SCIENTIFIC CALCULATOR ==="</span>;
    <span class="function">print</span> <span class="string">"Enter expressions to calculate or 'quit' to exit"</span>;
    
    <span class="keyword">var</span> running <span class="keyword">True</span>;
    <span class="keyword">while</span> (running) {
        <span class="keyword">var</span> input stdio.input(<span class="string">">> "</span>);
        
        <span class="keyword">if</span> (input == <span class="string">"quit"</span>) {
            running <span class="keyword">False</span>;
        } <span class="keyword">if</span> (input == <span class="string">"clear"</span>) {
            <span class="comment">// Clear screen logic</span>
            <span class="function">print</span> <span class="string">"\x1b[2J\x1b[H"</span>;  <span class="comment">// ANSI escape codes to clear screen</span>
            <span class="function">print</span> <span class="string">"=== SCIENTIFIC CALCULATOR ==="</span>;
        } <span class="keyword">if</span> (input != <span class="string">"quit"</span> && input != <span class="string">"clear"</span>) {
            <span class="keyword">try</span> {
                <span class="keyword">var</span> result evaluateExpression(input);
                <span class="function">print</span> <span class="string">"= "</span>, result;
            } <span class="keyword">catch</span> (error) {
                <span class="function">print</span> <span class="string">"Error: Invalid expression"</span>;
            };
        };
    };
};

<span class="comment">// Start the calculator</span>
runCalculator();</code></pre>
                    </div>
        `
    }
};

// Initialize the application
function init() {
    // Add event listeners
    document.getElementById('run-example-btn').addEventListener('click', showOutput);
    
    // Add event listeners to chapter cards
    document.querySelectorAll('.doc-card[data-chapter]').forEach(card => {
        card.addEventListener('click', function() {
            const chapterNum = parseInt(this.getAttribute('data-chapter'));
            showChapter(chapterNum);
        });
    });
    
    // Add event listeners to solution buttons
    document.querySelectorAll('.solution-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chapterNum = parseInt(this.getAttribute('data-chapter'));
            showSolution(chapterNum);
        });
    });
    
    // Add event listeners to project cards
    document.querySelectorAll('.feature-card[data-project]').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProject(projectId);
        });
    });
    
    // Add event listeners to quiz buttons
    document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
    document.getElementById('retry-quiz-btn').addEventListener('click', retryQuiz);
    
    // Initialize the first chapter
    showChapter(1);
}
function showOutput() {
    const output = document.getElementById('output');
    output.style.display = 'block';
}
function showChapter(chapterNum) {
    const display = document.getElementById('chapter-display');
    const quizSection = document.getElementById('quiz-section');
    
    if (chapters[chapterNum]) {
        display.innerHTML = chapters[chapterNum].content;
        currentChapter = chapterNum;
        updateProgress();
        
        // Reattach event listeners to solution buttons
        document.querySelectorAll('.solution-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const chapterNum = parseInt(this.getAttribute('data-chapter'));
                showSolution(chapterNum);
            });
        });
        
        // Show quiz section if we have questions for this chapter
        if (chapterQuizzes[chapterNum]) {
            quizSection.style.display = 'block';
            startQuiz(chapterNum);
        } else {
            quizSection.style.display = 'none';
        }
    } else {
        display.innerHTML = `<h3>Chapter ${chapterNum} Coming Soon!</h3>
        <p>This chapter is still in development. Check back soon for more content!</p>`;
        quizSection.style.display = 'none';
    }
}
function showSolution(chapterNum) {
    const solution = document.getElementById(`solution-${chapterNum}`);
    if (solution.style.display === 'none') {
        solution.style.display = 'block';
        progress.exercisesSolved++;
        updateProgress();
    } else {
        solution.style.display = 'none';
    }
}
function showProject(projectId) {
    const projectContent = document.getElementById('project-content');
    const projectDisplay = document.getElementById('project-display');
    
    if (projects[projectId]) {
        projectContent.style.display = 'block';
        projectDisplay.innerHTML = projects[projectId].content;
        progress.projectsBuilt++;
        updateProgress();
    }
}
function startQuiz(chapterNum) {
    currentQuiz = chapterQuizzes[chapterNum];
    currentQuestionIndex = 0;
    quizScore = 0;
    
    document.getElementById('current-question').textContent = '1';
    document.getElementById('total-questions').textContent = currentQuiz.length;
    document.querySelector('.progress-fill').style.width = '0%';
    
    document.getElementById('next-question-btn').style.display = 'none';
    document.getElementById('retry-quiz-btn').style.display = 'none';
    
    showQuestion();
}
function showQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    
    // Update progress bar
    const progressPercent = (currentQuestionIndex / currentQuiz.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-option';
        button.addEventListener('click', () => checkAnswer(index));
        optionsEl.appendChild(button);
    });
}
function checkAnswer(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackEl = document.getElementById('quiz-feedback');
    
    // Disable all buttons to prevent multiple answers
    options.forEach(option => {
        option.disabled = true;
    });
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].className = 'quiz-option correct';
        feedbackEl.textContent = 'Correct! Well done.';
        feedbackEl.className = 'quiz-feedback correct';
        quizScore++;
    } else {
        options[selectedIndex].className = 'quiz-option incorrect';
        options[question.correct].className = 'quiz-option correct';
        feedbackEl.textContent = 'Incorrect. The correct answer is: ' + question.options[question.correct];
        feedbackEl.className = 'quiz-feedback incorrect';
    }
    
    // Show next button or results
    if (currentQuestionIndex < currentQuiz.length - 1) {
        document.getElementById('next-question-btn').style.display = 'block';
    } else {
        showQuizResults();
    }
}
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-question-btn').style.display = 'none';
    showQuestion();
}
function showQuizResults() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    
    const scorePercent = Math.round((quizScore / currentQuiz.length) * 100);
    
    questionEl.textContent = 'Quiz Complete!';
    optionsEl.innerHTML = '';
    
    feedbackEl.innerHTML = `
        <h4>Your Score: ${quizScore}/${currentQuiz.length} (${scorePercent}%)</h4>
        <p>${scorePercent >= 70 ? 'Great job! You passed this quiz.' : 'Keep studying and try again.'}</p>
    `;
    
    feedbackEl.className = 'quiz-feedback ' + (scorePercent >= 70 ? 'correct' : 'incorrect');
    
    document.getElementById('retry-quiz-btn').style.display = 'block';
    
    // Update progress if passed
    if (scorePercent >= 70) {
        progress.quizzesPassed++;
        updateProgress();
    }
}
function retryQuiz() {
    startQuiz(currentChapter);
}
function updateProgress() {
    // Update progress counters
    document.getElementById('chapters-completed').textContent = progress.chaptersCompleted + ' Chapters';
    document.getElementById('exercises-solved').textContent = progress.exercisesSolved + ' Exercises';
    document.getElementById('projects-built').textContent = progress.projectsBuilt + ' Projects';
    document.getElementById('quizzes-passed').textContent = progress.quizzesPassed + ' Quizzes';
    
    // Calculate overall progress (simplified)
    const totalPossible = 15 + 20 + 3 + 15; // Chapters + Exercises + Projects + Quizzes
    const currentProgress = progress.chaptersCompleted + progress.exercisesSolved + 
                           progress.projectsBuilt + progress.quizzesPassed;
    const progressPercent = Math.round((currentProgress / totalPossible) * 100);
    
    document.getElementById('progress-percent').textContent = progressPercent;
    document.querySelector('#progress-tracker .progress-fill').style.width = `${progressPercent}%`;
    
    // Update progress message
    const messageEl = document.getElementById('progress-message');
    if (progressPercent === 0) {
        messageEl.textContent = 'Start your Lumen journey by selecting a chapter above!';
    } else if (progressPercent < 25) {
        messageEl.textContent = 'Great start! Keep going to master Lumen.';
    } else if (progressPercent < 50) {
        messageEl.textContent = 'You\'re making good progress. Keep it up!';
    } else if (progressPercent < 75) {
        messageEl.textContent = 'You\'re more than halfway there!';
    } else if (progressPercent < 100) {
        messageEl.textContent = 'Almost there! Just a bit more to complete.';
    } else {
        messageEl.textContent = 'Congratulations! You\'ve completed the Lumen tutorial.';
    }
}
// Scroll indicator functionality
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    // Set up scroll indicator
    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator();
    
    // Set up smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});