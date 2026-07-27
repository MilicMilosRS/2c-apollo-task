# GraphQL API za upravljanje korisnicima

Jednostavan GraphQL API napravljen pomoću Apollo Server-a koji omogućava registraciju novih korisnika,
dohvatanje liste svih registrovanih korisnika sa opcionalnim filtriranjem, kao i brisanje korisnika.
Podaci se čuvaju u memoriji (in-memory niz), tako da se resetuju pri svakom ponovnom pokretanju servera.

## Tehnologije korišćene u projektu

- **Node.js** – runtime okruženje
- **Apollo Server v4** (`@apollo/server`) – GraphQL server
- **GraphQL** (`graphql`) – jezik za upit i šemu podataka

## Uputstvo za pokretanje projekta

### 1. Preduslovi
- Instaliran [Node.js](https://nodejs.org/) (verzija 18 ili novija)

### 2. Instalacija zavisnosti
U root folderu projekta pokrenuti:

```bash
npm install
```

Ovo će instalirati pakete definisane u `package.json`.

### 3. Pokretanje servera

```bash
node index.js
```

Server će biti dostupan na adresi:

```
http://localhost:4000/
```

Na toj istoj adresi Apollo automatski otvara Apollo Sandbox kada je pokrenete u browseru.

## Primeri upita

### Dodavanje korisnika
```graphql
mutation {
  addUser(name: "Marko", email: "marko@test.com") {
    id
    name
    email
  }
}
```

### Dohvatanje svih korisnika
```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Filter korisnika po imenu ili emailu
```graphql
query {
  users(name: "mar") {
    id
    name
    email
  }
}
```

### Brisanje korisnika
```graphql
mutation {
  deleteUser(id: "1")
}
```

## Implementirane funkcionalnosti

- GraphQL šema (`User` tip, `Query.users`, `Mutation.addUser`, `Mutation.deleteUser`)
- Resolveri za `users` i `addUser`
- Validacija email adrese pre dodavanja korisnika
- Provera da li je email već zauzet
- Brisanje korisnika (`deleteUser` mutacija)
- Filter po imenu ili emailu u `users` query-ju