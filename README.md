# DomainSpot

![](https://img.shields.io/npm/dw/domainspot?style=for-the-badge)
![](https://img.shields.io/npm/v/domainspot?style=for-the-badge)
![](https://img.shields.io/github/license/swimauger/domainspot?style=for-the-badge)

Lookup a domains name, price, and availability over NodeJS

## lookup (async)
Main function for searching domains
```JavaScript
    await lookup('thisisaverylongtest', ['com'])
    // Will return
    {
        "thisisaverylongtest.com": "$12/year",
        "averylongtest.com": "$12/year",
        "thisisalongtest.com": "$12/year"
    }
```
| Parameter  | Type     | Description                                                                                          | Required |
| :--------: | :------: | :--------------------------------------------------------------------------------------------------- | :------: |
| domain     | String   | The name of the domain you are searching for.                                                        | True     |
| extensions | String[] | Extensions you would like to include in search. If none are specified, every extension will be used. | False    |
| manual     | Boolean  | Optional parameter for manually opening and closing browser used to scrape domains. (Default: false) | False    |

## Contributions
<a href="https://github.com/swimauger/image-classifier/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=swimauger/image-classifier" />
</a>