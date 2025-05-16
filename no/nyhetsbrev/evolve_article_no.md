---
layout: post.njk
title: "Deepmind lanserer AlphaEvolve"
date: 2025-05-16
author: " William Wale"
lang: no
permalink: /no/artikler/alphaevolve_article/
description: "Google Deepmind lanserer et nytt KI-system med mange nye ferdigheter..."
image: "/img/articles/alpha_evolve_illus.jpg"
---


### Google Deepmind lanserer AlphaEvolve

Forgårs (14 Mai. 2025) lanserte Google Deepmind et KI system de kaller AlphaEvolve, et sammensatt system som bruker flere instanser av språkmodeller til å forbedre løsninger på tekniske problemer.

Deepmind anvendte systemet på flere åpne problemer i matte, og klarte å finne forbedringer på problemer matematikere har jobbet med i tiår. De klarte for eksempel å finne en mer effektiv måte å multiplisere matriser på. Dette er svært imponerende, siden forrige forbedring for denne spesifikke klassen matriser skjedde for 56 år siden.

De brukte også systemet til å forbedre mange systemer brukt innad i Google. De fikk for eksempel systemet til å effektivisere hvordan serverne deres håndterer databehandlingsjobber og utregningene som blir gjort når språkmodellene deres blir trent opp.



### Hvordan fungerer AlphaEvolve?

AlphaEvolve er ikke en språkmodell, men et system som bruker språkmodeller som en delkomponent. Systemet fungerer ved å ta en allerede eksisterende "løsning" på et gitt problem, for å så modifisere det mange ganger. Så beholdes de endringene som gjorde løsningene bedre. Dette er en velkjent metode innen KI som kalles evolusjonære algoritmer. Det som er nytt med AlphaEvolve er at systemet bruker språkmodeller til å generere disse modifikasjonene. På den måten kan løsningene utvikle seg på en mer fleksibel måte enn tidligere. Dette er litt vagt, nedenfor en en mer presis beskrivelse av hvordan systemet fungerer.

1. Brukeren av system starter med å gi:
    1.1 En start-prompt som beskriver problemet og hva systemet skal gjøre
    1.2 En veldefinert målfunksjon (en matematisk algoritme som måler hvor god en kandidat-løsning er)
        1.2.1 For eksempel, hvis du vil at AlphaEvolve skal skrive et program som kjører raskt, kan målfunksjonen være en funksjon som måler hvor lang tid kandidat-løsningen brukte på å kjøre.
    1.3 Et utgangsprogram (eller en annen form for løsning) som AlphaEvolve skal forsøke å forbedre.

2.  Deretter setter AlphaEvolve i gang en iterativ prosess:
    2.1 En "generator" språkmodell, veiledet av start-prompten, lager flere forslag til hvordan start-programmet kan endres eller forbedres. Disse forslagene kan være alt fra små justeringer til helt nye tilnærminger.
    2.2 Hver nye kandidat-løsning blir så grundig testet og vurdert av målfunksjonen. Resultatet er en poengsum som sier hvor god løsningen er.
3.  Systemet velger ut de kandidat-løsningene som har fått best poengsum. Ofte beholdes også noen løsninger som kanskje ikke er best akkurat nå, men som representerer interessante eller nye retninger. Dette hjelper systemet å unngå å låse seg fast i en enkelt type løsning for tidlig.

4.  Disse utvalgte løsningene blir så utgangspunktet for neste runde. De kan mates tilbake til generator-språkmodellen for videreutvikling (tilbake til punkt 2.1), eller andre spesialiserte språkmodeller kan forsøke å kombinere de beste egenskapene fra flere forskjellige vellykkede kandidater.

5.  Denne syklusen med idégenerering, modifisering, testing og utvelgelse gjentas hundrevis eller tusenvis av ganger. For hver syklus er målet at løsningene gradvis blir bedre.

### Konsekvenser

AlphaEvolve vil garantert ha betydelige effekter på flere områder innen vitenskap og teknologi. En potensielt skremmende innvirkning er at AlphaEvolve vil påvirke KI-systemers evne til å fremskynde KI-utviklingen selv. Et eksempel på dette vi allerede ser i DeepMinds rapport er at innovasjoner AlphaEvolve utviklet, førte til at treningen av Gemini (modellfamilien som AlphaEvolve bygger på) tok omtrent 1% kortere tid. Forskerne kommenterer på dette i arxiv-artikkelen deres:

>Beyond distillation, it is also intriguing that AlphaEvolve can make practical discoveries that increase the efficiency of its own infrastructure and of (future versions of) its base LLMs. Currently, the gains are moderate and the feedback loops for improving the next version of AlphaEvolve are on the order of months. However, with these improvements we envision that the value of setting up more environments (problems) with robust evaluation functions will become more widely recognized, which in turn will result in more high-value practical discoveries going forward.

I samme gren snakker de også om "distillation", en metode hvor man kan gjøre Gemini-modellene smartere ved å trene på løsningene som hele AlphaEvolve-systemet har brukt tusenvis av timer på å generere. Etter de har gjort dette blir Gemini modellene smarter, og de nye Gemini modellene kan settes inn i AlphaEvolve, som gjør hele systemet smarter. Dette kan skape en selvforsterkende syklus

> On the other hand, a natural next step will be to consider distilling the AlphaEvolve-augmented performance of the base LLMs into the next generation of the base models. This can have intrinsic value and also, likely, uplift the next version of AlphaEvolve.

Begge disse to metodene vil (gitt de fungerer så bra som vi tror de kommer til å gjøre), føre til at utvikling av av KI systemer kan fortsette, og potensielt går enda mye raskere.

En potensiell negativ konsekvens er at systemene vi bruker kan bli vanskeligere å forstå. Hvis, om noen år, store deler av infrastrukturen brukt internt hos Google er designet av KI og ikke mennesker, vil dette begrense menneskers evne til å forstå hva som skjer. Dette kan ha katastrofale konsekvenser hvis KI-systemene optimerer for feil ting, og hvis folk ikke bevisst jobber med å ha oversikt over hva systemene gjør.


### Lenker
*   [AlphaEvolve Lansert](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
*   [AlphaEvolve Forskningsartikkel](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
