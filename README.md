
# Backend Test
Backend API for product and brand


## API Reference

#### Get all products

```http
  GET /api/products
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `limit`      | `int` |  limit page |
| `page`      | `int` |  current page |
| `name`      | `string` |  name of products |



#### Get product

```http
  GET /api/product/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  id product |


#### Create product
```http
  POST /api/createPostProducts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `int` |  name of product |
| `description`      | `string` |  description product |
| `price`      | `int` | price product |
| `stock`      | `int` | stock product |
| `brand_id`      | `int` | brand id (refrence) |


#### Update product
```http
  PUT /api/product/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  id product |
| `name`      | `int` |  name of product |
| `description`      | `string` |  description product |
| `price`      | `int` | price product |
| `stock`      | `int` | stock product |


#### Delete product

```http
  DELETE /api/product/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  id product |


#### Create brand
```http
  POST /api/createPostMerk
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `int` |  name of brand |
| `description`      | `string` |  description brand |

## How To Run
 - npm install
 - install knex globally
 - knex migrate:latest
 - knex seed:run --specific=seed_brand.js
 - knex seed:run --specific=seed_product.js
 - npm run dev

### Query & Migrations

```select  * from products p 
where p."Price"::int > 100000 and p."Price"::int < 200000 and p."Stock"::int > 5
order by p."Price"::int asc;
```


Migrasi database pada dasarnya hanya suatu proses perintah untuk melakukan konek dan menjalankan sql yang telah dibuat. Maka dari itu pasti dibutuhkan schema seperti database, hostm password dan seterusnya. Tetapi jika kita melakukan query secara raw dari suatu bahasa ke dalam database, penulisan query akan sulit serta rentan sql injection. Maka dari itu diciptakanlah suatu tool bernama ORM.
ORM berfungsi mengenkripsi dari raw query ke dalam form yang ditentukan dari ORM itu sendiri. Dalam case ini saya menggunakan knexJs sebagai ORM dalam expressJS. Untuk proses migrasi sendiri kita perlu melakukan initialisasi "knek migration:make nama_migrasi". Dan setelah kita katakanlah menuliskan schema table, column, relasi table maka saat kita melakukan proses migrasi maka Knex akan mengubah menjadi bahasa SQL beserta schema itu sendir. Penjalanan diurutkan dari migrasi yang pertama kali dibuat, misal "20240323024401_create_brand_table" akan dijalankan lebih dahulu dibandingkan "20240323031219_create_products_table". Migrasi yang telah dijalankan akan disimpan di table baru dalam database. Hal tersebut mencegah migrasi yang sama dijalankan kembali.