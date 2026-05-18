# Projektuppgift - Programmering i TypeScript DT208G

Projektets syfte är att skapa en webbplats för ett fiktivt universitet. Webbplatsen ska hämta in kurser genom en "service", och det ska finnas möjlighet att lägga till kurserna i localStorage samt inom ett ramschema med en till service.  

Jag gav mitt projekt och det fiktiva lärosätet namnet Norrlands Universitet. Ramverket som använts i uppgiften är Angular, och den externa kurslistan hämtades in från Mittuniversitetet med en webbtjänst, URL-adress, i JSON-format.  
Möjligheten att filtrera och sortera bland kurserna ska finnas med och funktionalitet samt logik ska finnas inom komponenter, services, och interface.  

**Webbplats:** https://norrlands-universitet.netlify.app/  
**Rapport:**  
<img width="1000" height="500" alt="startsida" src="https://github.com/user-attachments/assets/d3de6199-a031-432c-9268-77df2e877143" />

Genom Angular skapade jag komponenter och sidor. Jag skapade tre sidor för webbplatsen som finns inom katalogen pages:
- **Startsidan** (hem) med hero-bild och information samt lämpliga bilder.
-  **Kurslistan** själva tabellen för alla kurser. 
-  **Ramschemat** Alla tillagda kurser i en tabell. 
- **404 - Not Found** Kompletterade webbplatsens sidor för att hjälpa besökaren när den navigerat fel eller hamnat på en sida som inte finns.

Komponenter som skulle finnas på sidorna genom sitt innehåll skapades separat i katalogen partials. Exempelvis:
- Tabellerna inom både kurslistan och ramschemat skapades som två skilda komponenter
- Bilder och sektioner på startsidan
- Header

### Interface
Jag valde att skapa ett interface för hur datan som jag hämtade in från webbtjänsten skulle se ut:  
<img width="494" height="272" alt="interface" src="https://github.com/user-attachments/assets/72420f7d-b1e7-4f16-8191-84ad83ae99af" />

### Services

Två services användes för att kunna hämta kurser till kurslistan och lägga till kurser i ramschemat från webbtjänsten. 

Inom servicen för att hämta in kurserna användes Inject och HttpClient. En metod, fetchCourses, hämtade sedan in kurserna utifrån interfacet tillsammans med HttpClient. Startvärdet (initialValue) valdes till en tom array.  

För att visa kurserna användes angulars signal med en konstruktor. Kurserna blev tillagda i localStorage genom metoden addCourseToPlan, och samtidigt hämtades kurserna in från storage med konstruktorn genom en annan metod, loadFromLocalStorage.

### Presentera kurserna
Genom service och interface hämtades kurserna in, och genom kurslistan och ramschemats respektive metoder kunde kurserna visas inom tabeller. För att skriva ut tabellerna valde jag att använda mig av Angular Material.  https://material.angular.dev/  

Att göra tabellen responsiv för alla skärmstorlekar var viktigt och därför valdes exempelvis ikoner för att lägga till en kurs i ramschemat i stället för text inom mobilläge. 

 ## Valfri funktionalitet
Jag valde utöver grundkraven att lägga till ytterligare funktionalitet och design.

- För att skapa en inbjudande hemsida gjorde jag en startsida med en hero-bild, information om lärosätet med statistik, design samt studentrecensioner. Alla sidor inom webbplatsen fick en navigeringsmeny samt footer.

- Ett **färgschema** för ett mörkt- och ljusttema utformades, och funktionalitet för att skifta mellan teman gjordes med en selectbox samt ikoner inom header. Jag upplevde det som väl användbart för alla användare och tyckte det var kul att experimentera med olika färg. Färgerna sattes inom den globala stylingen, (styles.scss).

- **Paginering** samt **autocomplete** kompletterade tabellen för kurslistan. Det finns möjlighet att bläddra mellan sidorna bland kurserna samt välja hur många kurser som ska visas per sida. När man ska filtrera och söka på en kurs visas valmöjligheter (options) för sökförslagen och det går att klicka på ett specifikt förslag för att visa just den kursen i tabellen, genom kurskoden.

- **Progress-bar**: ett inputfält finns ovanför tabellen till kurslistan för att kunna skriva in hur många poäng som användaren vill läsa på universitetet. Minst antal poäng är 0.5 och högst är 300. När användaren skriver in ett värde i inputfältet så visas en progress-bar längst ned på skärmen med position fixed, med syftet att visa hur många procent av det angivna antalet poäng som uppnåtts när kurser läggs till i ramschemat. Färgen ändras samtidigt i progress-baren beroende på hur många poäng man har lagt till i ramschemat, exempelvis olika färger vid 33%, 66% och 100%. 

Felhantering finns till progress-baren och validerar beroende på vad användaren skriver in och hur många poäng av kurser som man lagt till. Detta tyckte jag var uppskattande att arbeta med, och varningstexter skrivs ut genom HTML-koden tillsammans med Angulars @if. En ikon likt ett kryss blev tillagd för att stänga progress-baren, vid klick återställs antal poäng som skrivits in i inputfältet och därmed döljer "progress-fältet".

<p align="center">
<img width="600" height="480" alt="progressbar" src="https://github.com/user-attachments/assets/c5acdc44-b96e-45bc-bef2-0f6a06b0c138" />
</p>


 ### Styling & validering
 Styling gjordes med SCSS-filer inom både komponenterna samt i den globala SCSS-filen. Animationer finns för ikoner och texter för ett mer levande och trevligt innehåll. Aria-labels användes för att höja tillgängligheten där det var lämpligt och för att validera koden ytterligare. Mycket färger med bilder användes och det krävde att både bakgrund och textfärgerna valdes med noggrannhet, eftersom webbplatsen skulle vara enkel att navigera i. Webbplatsen testades i både mobil och desktop, samt webbläsarna:
 - Google Chrome
 - Microsoft Edge
 - Mozilla Firefox
>>>>>>> development

## Instruktioner från Angular:
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
