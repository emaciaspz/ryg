var pdfTemplateLog = getLogger('pdfTemplate')
function generatePdfFromTemplate(infoSiniestro, infoDetalleInspeccion, dataUser, listFotos) {
	pdfTemplateLog.debug('generando pdf', {infoSiniestro, infoDetalleInspeccion, dataUser})
    var options = {
        documentSize: 'A4',
        type: 'base64'
    }
    var data = getPdfData(infoSiniestro, infoDetalleInspeccion, dataUser, listFotos); // Obtiene plantilla
    pdf.fromData(data, options) // Genera pdf a partir de la plantilla
        .then((base64Created) => {
			Directorios.obtenerDirectorioEspinosaDocs().then(dir => {
				let folderpath = dir.nativeURL;
				let contentType = "application/pdf";
                let name = window.localStorage.getItem('idSiniestroServidor') + '_RI.pdf';
                let filename = name;
                savebase64AsPDF(folderpath, filename, base64Created, contentType);
			})
        })
        .catch((error) => showError('Error al generar el pdf'));
}

function getPdfData(infoSiniestro, infoInspeccion, infoUsuario, listFotos) {
	var logo = 'iVBORw0KGgoAAAANSUhEUgAAAPAAAAA9CAYAAACTI+T4AAACxGlDQ1BJQ0MgUHJvZmlsZQAAOI2NlEtr1FAUx/8ZU6pYBKGtZRAJClKkLWkVH4jamb4YW8chfWiLIDOZOzOxmUxMMn1RXHTj0uoXELULF36ALly4shulQq1uRHRZRSkWupEynptkZjLU14Wb/O55/M+5yU2AusNJ09RDEpA3HEsZiErXxyek+s/YhzCaaDYmVduMJBJDoFG+147tdxD4fa2da+32/3XsTzNbBYS9xIW0reaJZ4DQD9W0HEDkesemHZPzInGjRQ0SL3HOerzMOeXxKzdmROkh/kR8QM0l08SbxG2pgD0bYK8HdzQOMINZmirxZ5GwChlNZ4F2/+H+z5HXi+V6B2k2MGN0mO7Had93mN3ns7CQTvYOEncQf0mz3j6+B+KnGa0/RtxK80PG6h/1WDihObERj0Njhh4f8rnFSMWv+pqi6USVsr49NdxXtt9KXk4Qh4mVycIgj2mm3O653Mg1jwV9LtcT9/mtVVR43aMUs2Tq7rmg3kIvMQ4dDBoMuhqQoGAAUbTDhIUCMuTRKEIjK3NjLGIbk7+N1JEIsET+DcrZcHNuo0jZPGsM0TgW2ioKkvxe/iavy4/kJfnrYrjYWvUsWDc1dfXeJunyymVd3+v35OmrVDdCXh1ZsuYre7IDnQa6yxiL4aoSr8HuxrcDu2SBSu1IuUqTbqUp12fTNRKo9qenR7Er889bqrXWxeUbaw0r8zXPqrBrV6yyq9p1NS6Yz8QjYqcYE8+K5yCJl8Ru8aLYS6vz4lAlY5RUNEy7SjaSlGVglrxmzTvzYuGwGYcf+J6COWtp2ZwjRehvwaSYoXa0SV1y5xmA/3u8z2JLcf8pQvNq1eZcAS58B/a8qdomisAzGzh0qmprpTPc9BBYPq0WrSn/OxOE14CdOdnlrRqoo7qPpdIWnf36B8DO/VLp5+NSaecJ6X8AXui/ACfB9gmNENQDAAAACXBIWXMAABcSAAAXEgFnn9JSAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAABAAElEQVR4Ae19B3yV1d3/N3vvnRCy2IQR9pA9HBXrLlq12mq1w87Xt/ZttVq1FbXO2lZfbW1dxVWVoYAICAKyRwBZAZKQvcje+X+/57lPcnNzma7Xzz8Hbu5zn+fM3zm//Tvn8ejoaO/A1zR1dHSgo6MNnp4+AEfx3rtL8Ns7fo+ahnr4+Hij/SyG5uHhAf5nXZ7QhZeXJ1rb2uDn4Ys3lr6MtH7prK+Vz70c0PLAna9swYLlOUiM8ENt29cWjF/T2f//utttHr6BXu1NdY94f23BYJC33SBvWUkp/vbkM3j8gWcQkRQOX98zQ14hrZe3l0HWdtbX3NSMiqJq1DY0oBatBI0+ldj48ScGgYnfohPQd2/qhcBXDgEPz46vJQKL8yp5enrj0+x9+O2vfoc3l76OoRlZkEBxKs4rpPUhgovLNjU2oehQOVE0T7VhSMJQjJ86EnHxsYiOiEDftL4IiwpHWloaMbedRTwNApvGzZ9eVO6CRe/Vlw6BjnaPrx0CU+S3UMfDC1s3bMZPbv0lNu4+gKwh49FY30SR2r0o6+HpAW9vb7S1t2HXgWOsoxQZEUPwzW/NwZjxo5DeLwOJCfFITU9BSFgon3vAk2J0V1K7FLO7bvDKfVvdsvT+6IXAFwWBrxsHNuhCBPUg591EsfbWG36MkvIqDB+UgobaBsNV3cFKHLelpRW7Dx5AGEJw8w2X4bzJk3DetElI7JOIgKAgl2IWYpKXd+KoOLeSnnRD4m4/TJbeP70Q+NIg8LXiwB3t0nm9sWPzNnx3/m2oqKlBbFwkGuobKd52xyQxYi9vT3j7eCFnfwGig4Jx1x0/xSVXXILM4UPhHxDgALJlCLNteaYep7pc6+3eCn9ZuP6lTVhvQ70QcIbA1wSBpddayFuQl487f/4b5OeXIXVgIhob3COvr583GhqasDdnD2759o249fbvY/S4UZ1cWhZlJSMUE2E9KWJbN7qjqHXzZH97sfdkkOm9/+VA4EtBYOmlrpzsbIbX0UbkpT7aUFuHPz34OJZ9vAUjBqWh6SSc18/fB0WHyxEeFYiFL76IeZddTDE5kE22kRAIh4WwtjvobHrimpfIfjb47lq893cvBD4jBD5XBLb8shZXskRRx/o2i1yiKiVO/WGSRddJUj3pMEx2Y0vyxGuvvI5H//InjBg4Fs0NzaqkWznlFfLmHyjFlNmj8PsFv8PwUSNMnvb2FtOm8fN2K/VZfmhAn6V8b9leCHwGCJyzFZqWYAcaGoS08ciDlmH72rlbNprpWddz1uEItOjkzl0PO4vL6iy9d9/uvXjonsfQPznTGKRc8cZG3mMHinDRJVOw4Ik/Ijk1xQRfqH1P03hnted8oXbt8ThfnXOFvQV7IfAZIHDWHNhwUIPAHQaxhLR2aqirQ0F+IappXCqkrlrCAItmWn+VtOjD6J5JSU9FPN01fVOTaU22yra3NZvrHk4aYqU4Zjsjot5a+Bb2Fu4y3LfJcF9Trfkj5JXOe5ycd+rM0Vjw+INE3r5oY71C/k4C0VXknK+6kFdVsOHuN8653t6CvRA4awicjRvJFo+tUEMfs26bGLFUVFiMw4dykL0zG3v27MWOjTuxZ38u6lDB/jTx48wrRS8CMCVrNKbOmoyZc2Zh/KSxCAoOJidvc3DzLoxQmxK19+7eg78/+TIGpgxHS3NLD6SRtVkGqz5pMbj/4XuRzACMttZmRliRQHRVd9bwOaMCzsM7owK9mXoh8PlBwA0H1oq0Vr3EV3E3cTBbZ21taUHe0Tzs3p2NdavX4YMlq7E95wjLlPETjfTEWHLZOCJPggp2wx/VJd9q3vEiPPDIAn6ewvevvwa3/fj7yJKFmEltStpVXlmG5Tp6f8ly5NTsx/CE0Qx3JAK7JIVDHmIfXn/lf43OK33XQl6N44vE4C+ybpdB9v7shYArBHrowMQa/VOydE8ZmqxopKqKKuzNzsayJSvwwfursX7XdubyQT8GQgzt1xfeXmks00HOJ0tvB1raLNHZVOb0R8QgKDgAIyKy0E5kfenFRVi15GP88c/34Ir5l1nIa5mKWcoL+ceO4f3Fy5ASM9DU7VSVuZSf9/iBEnz32itx4cXnm3uWa8g5isq11Of4uxeHP0dg9lZ1VhBwFqEtEZk7e8T+jDHKk9yuCblHjmH1yo+wcsUqLHrnQ4rGDUiPT8SwAQMNb2ttaTOI1cbvM0kGyblzR/qpUv8BiWjgJoIriYAvN72Ma2+81iCxkFtd2bFtJ1Zu/BjDBwxhf7oTBREDI2aznptuvgFBISHUl1uM3mwq/wL+WHCSbt6l+38BzfRW2QuB00NAHFgBEl0issW1yopLsHnjFqxZtRaLX38Pewp2MgSxD1IzEuDFhSsua3RRi1mfvqFT5GiiSOzr44NBaSNw400/R0JSAmbMmUFCAsY2N5g+eLB1idSuSaJz3qFiXMp45qwxWXxs+5s/X7ZoI20XnKyeGGnFTb9c+9n7uxcCXxQEvG1O0tzUiP37DmL92g1Y8s57WLRyDdvsQP++yRhOv6uCKVqJuG2tPXVQ585pkRsuTgwUGml9WzuEtBnAfWppbjVW5LiIMDx035/IlfuhT0oyysrK8Mn6LUiNj2C7PcurrRMox9Tp55H7yhBGYvR5cEbWY6kSFocXjGxVoo7BJArlDA0Nho+Xw4TQi8TuJ7b37hcOAe/83Dzs3L6LhqJleO/ND3C4Yh/6hPdDZv90g4itdAM1N1ri7sl6I0TSBngv6qOtREbFJjfUNqOltg0+wV4ICvdHYGAAVJe7rX4sTo7eiui4CLy/9j289dp/8JM7foJSuqGObD+G0DRx4O5Yojbb6F6KQiwmnjfedM2I06rsMySL28qAJhFZxjva0mltP3L4KLZu2opVqz7C8y/9L55+5En4pExnHttq8Bka7S3aC4FzhID31d+4DhuyN7B4MAaK20aPMSKykM2wz5NULATypgjrQcTVRviS45UoaTxCdEpF/5F9zZ7agEB/1BOZj+XkYduB3QzCSIefr68JxFB516R6MpKG4J/PvoKr5l+B/Nx8HMcRRPmOJWFo6SZGi2CUFZ/A5NlZ3NAQ56iqZ52ubXT/TaLQQS6rfyQQ2nJoW9slaRTSWr6V3HbNh2uwZOFyHKjYg1ifNFOFf4B/L+p2B2bvr68AAt5FZaUY1n+40YMNt3XjprH7JaRTTLIXgyu0r/bYoRJUczN8WsggXHDxNEyb/RsMHDQI8fHxCAsPJbL6oImIV15Wjo3rP8GjC55GObf/RUSFGG5s2JtdOb/FnYOD/bFt/ycmf01tbefTVhq+ZHH2IpK181r9KKotRb/B/RBq9u9K/+3MfooLIa2Dazq4urYn2mUrSsuxl/7s1R+swfL3VmLtts2syxcDKNKLuHnzqJ6SPUcshP9CXVSnGELvo14IOCDgHUguKfH1dMnith4oza9CUX0RgmhYuuLKOcbgNIY+3LSMVGMFdq0nhDei42IwcOggjBg5HD/67k+RTyNZSGhgD71WvlsvbrpXeo/IExasDQjcglBZCw/2saCqDFU8PyPKLwOp/WP4pAVhtDxro76VTo/Blm/bYUV2RJHV1dQyGOUw1q5aR277EX3bH7OVWqQZa/tgh7WdqsQpiJujA71fvRD4UiHg3Ubj1OmSRMtjh4tQw0V92QWzMW3m7Zh03iQMGjLQcXqFaiBXYwCFNFVXP6yCMeDRgZFjs/CHx+7FxXO+bRBYXE9MUNFdsijnH9TxNkcwa/QUDOgbh8FZWZh+4VwEhUaQ49JgVV6G8oI8LH93KV5dKrG/BeHkvh4srwARd2K5emYnS0eWQcoDLXKRHcvFBh4M8BEDUt751zKU4ChDUVKQmBGLZAaiyDXW0gNpT08k7PZ6v3sh8EVDwGZdJ21HyNtU14RbfnQtLv7mReSiwxAZE92Zv52itJDXLGtytM7wCeuGyWcQjJZd5ZsyYxp+8NPr8fATT9O3O5jicDvqG1uQcyQbN1/9Lcy9dAGiUgeh1isER6uIZPwU5jVQvAaSoxMwdOhA/GDcdEydvQw/+MWPSRgcLYoS2HJwZ++6Lizk9UQd47TXEmE/oovsvXc/wI7DEpFjMTg9EfHeY4wYLzfZ6aztXTX3XvVC4CuCgAI5hKD2rqAe3SAS6njWfSU7MH3mAiMuK48thhqdmNzvtImIpU0PZlM+xeQZM6YSgR8xluuyMp6qERSAF//3OaSOm4IdxW14dm0+Psg5CDQo7pmISe5rkLOV10T4cYPjcP8lV+LZp7y4eaLYNK++WEhqKMdJu1TPDRf3/c8fsT57LQanjqCLbAzHz/MnZW3vwW1PWk3vg14IfPUQUCBHC7mfj5+PQUpiSfdOEV+sFIqP167H+d+Ya/y1ymc2NdiPz/DbFnEzR2ZiwrBJOLD3OMaMy8Cdf7gXZYEpuPmNbOw/yk0Q/t6ID/CGDy29IjCtNG41k8NS+OU5zcCmnFLMfXEbls+/AP0L96O+rh6BZsO+uLz7ZLXdjujYGFx13eXYdOdBjsWXJ1Oe3kUmg5kkBRGI3tQLgf8zECAH9pw2YyIqyQVN8L+bnukwuAHJKVjy5jIUFRQyhxcXspuMZ3ErNDQEsTy6NZSu1l8/8DvsaYnD1X9Zh/3FNUiMDERcoK+Ok0MeOXBuZSMK6rjdkEjcSDm6khbo5FB/7p2owbPr8pE1dRoCA3zPSAeWlVuBHlljRvLE52bjR7aJinP3dU9GOxE26QRVlTVk/FZop9SA3tQLgf8rEPD81nVX0x1Tafy57hazxGv/AD9k521nVNQmR78/2yJWkERLfTP+e8HPUBWWhttf2oL4UB/EkOs2kjoUN7ehpLkDk1Oj8JPpGfhmZgJKW2g5ZrMS2E9QlE4I9sMbe0qwLbeKN71PrgY4Qdoe3+AhgzBv1hRjUZc/2U6SKnzkquJHRG33gb2oyqnBmKxMhAQG8k0NJCun0LPtenq/eyHwpUCAIrRnFo+cuXjmZJQyEMN5MXfvgETrYGzc8AkDKrRJXlz43JG4iQEbsRGBGDJpBp5YcYiKNvVXIk8b66yg5TeDz1769gg8dmEiZoWX4Y7xwXjyksGoJBL7OjomtRh0LW0+VMoL9sVF+ndk6/HVwcPsYnmgwMw501HcmGOs39LzfXkUTxPHdvBQIbIP5mHUmKF45A/34Z31r+LZF/+KWXOm4WBeqeHMPSrtvdELga8CAjJiRcfF0i00FYs/XEQrLCOeaIF1Ta2treiXlIoVi1fj9l8UIDU9lRyPIqXhXmeAOQbZHdFOtBofOngYaYMyUO8djtU5BygyE3mIg8ZQzeCPBRf3h+fhjXh/x168/M83kRIfiruf/Ruuy0rES5tyERviZ0RsccPiigairxV/bRmxHL1nmw7bOJ+K2MiQxiAQB66PmzAGgYinft3GDRGlDEhhVNeIkZjPLY0zZk9H5ohMxCXYEV7A5KkTgaceYx1pneBRrb2pFwJfJQSM/CgEBmLMy7xsMdO5UzLgBDJCavexbdi+eav1iHh75kxYyKuzrSxkf+fNRQiJCEd5IwNIKC538D61TZygznt1v2jEepzA/b96mCGZI5A2YgCWZ2/Gwb27MSE9ioHJbfC1aQYxSO9BOkKCUFlWQeSiP5iERW1pO6IogoeHtGmhmv3b6n7/gf0xnly24GAJbvjepXjtpefwz9eexz1/uAuzLphlkFcEQSd7KOks6ckjJ6K2pt6qoPdvLwS+aghIhFYfBg4egGsunYPjh8pOKiJarqZYfLhyLV0uEqNV9Mx4UFcuLxOi+OBjf0CIdg+JHTqogNBM7qJKInE98fqam6/ExMkTEBEWpicIj4ziQe6NzEOLMH8bHCayJkQGYR33Ku/Yvtvks/YRy0pOmzU/7R0K8iAPFnKbHOx3Ryti4qJx38P3YPmGt/DQkwtw1bevQgZ3QXn7yt2lTRemRwwgkau8jVspUzF1xmQUHNPJIyGOurpGZqru/dMLgS8TArJCKxAjNDwcM2ZNY5hiLu1BBqd7dEMRW+kJ0di0bhOOHcnlcyLEaViwnlv7jXmyB18BumHdRnMouyqvqqhEBA+iAzmokFgu3ji6j1bklGNPpQ9u+fmPkZKahNS0NEzPHI/4fkPwVjZ9vgFetEbzxA8hP63PfSN8cZDGplWO7Y9eXj58xsgxitYvrz+KxxbvRW1jm4XwnaMi+lOcnsxtiGMmjEUAd0pZSNtqxHhPIrukBdmrJH6LqwuRp82cwmg0cWQLuTur673ohcBXBAGZb9m0Fw+XG4+UwAHQBnuJ0a7IKTE6JDQIm/ZtwE6ekiFudTIObMrykDpFYCmAQ37aJW8vxf13PYia+jokRAzC7q07MOGb85HEw9ePn6hHJC2/TUQX7j7EL1ceQQB9wNfPCMcl8+Zi4sQs7Cxtxw4id3yYn3npZwn9txcMSkCcZx3ef3clUgYPRDmP/dlT0ozlO45j+YFybD5KCzW3Ms4bzxeWBVi+bktyMPybY9RBesJli2O7nQMDC46DDwcMGoCJwwZhw+61ZqslUdxtkd6bvRD4siDAvfdahO3oP7AfLrxqJgqPnFyMFhcOQxJWcKNBI/fI6sXaNqLr2/6YLXl81kL9dhu34/32jrtx9XXfY2BVMzc8BCGcVubFi9agofAIvj+uL1DdRMRlwAaRyYffIdzn+8NXt+Oax1ejyL8PWvuOwn8t3QcEehv+J6EW7Z64aVIKDmzbiC1HdqGquBCfHs7H/Uv244H/7GP0WA2SQpiTnLq0qoEFNM7uCKd+CqEtGKhSd0mc2CrXl0fVzr5gusmksq4ETHfO5tO9N6baHn9kNvDmh4Z689E1QWTa6ZHZ6cap+sHiLpBwKuhyqbzOdbk8Nj+d8+j6TJNzvWdbzh1MzqYO5z6qnGDqWqdgfy51qow9tnMp79y3010bBJaYqzf0zb1oLm2x+WbjgLuGFSMc3zcKq5evM2dlqXKJl5aYrIUuZFC8ca15e+B9v70fl02aj8f++gIy+/UzYZna8O9NaNHzjCVvvIHzB4VhcEY0cnkAQBjvC4m1ZTAuxBeLPy3FZS9sw+UvbedLt1sQ4cOXlVGkLWLe285LRUJrEZ778/MYmD4KO7YeRFXBcYxNDjeIHkldlp0B6lt4TjV1Z9NZVn4OSQgs3Vo7paZMn2JqMMSqW130U7Nv1seeQP12d23f61ZBtx/+bDOYhWUnqGhpRzmJYXlzu7lu0tZK5g7h8wCtMjepZz+svqicotkC+All2UB+TlKFo1ZFwNnjsu363Ru0xmjlkTFSxOb0kLbrtGDhfhTd2/FnRwUTTzKLCp7Q4goTf1YSxDxCxjNJyqbxCxaCqQVnq17Vr8Af1RnCPGc2JqtVwZirz6wF+9p68vn/5UZYs0pMzVmjR2J85mSU0KKrbYauO5W0aP0D/bAzdzO28HSKAQyI8NTZy0TGdp5CWZBXiO0Ur99f/D4Wv7QMuS2lGJSaimE+YTR8OTbkEyDavpjZPxlP/v1fGDl6NP46/xJM//sWHK+qR58gH9Rz9hso2ccF+ZoIKIVSelA3Z1GU0E+cGBeMH8zMwJY3XsC67I3I6DucB+sUo6amkhst0tkArcf2CmLZZkoOJhmuaV2e7V+1rTQ4cxDCKYXoNBBbhJaerA2Z1TwcoPvStUuppPO1fit1INTc7v4skD+LdICfBkGX2fAoP/hRxVD+Ft47zsi0UhIx1DEP2Ua4Hw1vjvrVFzkCK+zxqxnntqUzqF59dEwRV3uUvyd8aRyUbcFKVn+EmFRCug2Ja9mY8NSecqlEpV1Md1QH49ejWB9jcZxbVk0mqY+yJFR3ltPtDoSxeBeJkETH8rznxT9+fFJEW4ah8EHeGBgegFDZUJja2GYe4VFcw3PIOaZQP08E6Kxwl/GYzPzDmi1uy/qLZDHloGKpmg0K8jPMQ72u5RrdV9uEaj3XgY2+nmQgPHHG9FAjd02qlX3ln3IDA0JPnTdjsMZmrUJ3ZV3rOsPfioVWVsu904GUtBTMuWgm7n/oCW7yH9ADgZW3QxPPTXcfrVmHy6+6DA2NjdjDg9e1w8ecXrluG0M+fJDIQ9aH+4QbZDUH4KmwU9JWvSEZg/DdH92BF57xxMZbL8av/rMXa/YyMMPfy3Dbeo5YaCs4qFlRVj+KvJ5EyPep546fPo9nQSfj3dfewOHcXahvqEcEAzK0aszkO9r7/EDWwcMK4nDjbVfRVtBkwY2dKyCHnJEUil9/MxOhgTz0z8yUWhWseib1zZcLLPv4CdzK+G8/wkJSieZdgSpFDa2YkRaJ6yb2xaj0SMQF+9I7YCBhosHkbsuvbMCnx6uwhlLK64cqSFQs+JSTeI2MDsD9V4/gK1VFAB190Be71My+VlMqqeXbLQoq67H9WBVeob1AkkoM4S47hJK4UjH78ctZGZjPfrSwj5qDJ5bsYwRcKRJIaAspEQyhjeH+KzKRFEFDIAdWXteCBYv3Ye2xStbHyDrCwqrRVGs4mSSJWf0icde8ofDjuBXvvnx3Ee5+/wCiSJCIMgZNRAjE+RoJ0EpSgzkZEbh8VBKGEzZ9dEyTpCwmccoKtnu4tA5r9hTh4W0FlLqaECuDJ/ss1LKJrcDgwzmrZp2tJLjfHdcH87KSMDgxFBG0k9iuzkZKPGXchZdb3ojdueVYSgPq+qJaRLCvIpCuSWOUe7OMIuTds6iOMmZB61bweGTpp1hF+00UCQ6n5/NLCuSwauPioSgs18vMWdOJwPcR6u5bUmx0/+QEbFi7BQ/e/zDPijqCl15fTA7QjKSweAzu18cASwEhp9vdI8NY1sDBXBwdGE//78IfTMK7m45i4aZ8rMyvJrDETUSvrUUg8VoiYzk50K/e3ovhFJdvnDAcN9+dhYmzZ6NvYhwK1G9Bzk7O1/a9s/gWsnUhImOkeSTQ6LGjUcVTRswzNcVFKi44uX80F5UDpGfQRgAjwFpY3o8VkSyR7FFfJ5bcyQXwswsHIU4x3ybZELB+8Yw/DEwMx6yhCZg1LAkH/7IeO8rqkUAEVKdC2IeJVEsiaaU/Xaojp/9pfiWe/fAQnt9WiGhijLijt+BGgGfEBmEM1SYrdWBhSI7hckIsUZxAqjXj0qORRI5oJ1+Wnfv3zWgmEsimoXmzk7i6ykWT200ZEGMItG7ls/+Co1BSCMJLIoQH6rhGPIhYT186AFfRGBkTYsOEGZxSLCnYoKRwXDgiAVdMSMGj7+/Ha3uKEUOCwEh6s4aUXXqu6oxiePCjlw0xecUUrDnWoLpSn+hgjEwBLiHRyIg/hvUvbmV/lZP40pXNXElKKCf3H0J4XT0xFUNJEOx0uOAEVh2uMOpfq1Nf7Ofn/G1zYOcKhnG/70XTL8a2Lft4kgZFX5fILInROlKnmecv3/vgkzRqBWJQRl+zGUIIqdMjled0SWGbxRzUN68dh8uuvJTZvchpgFtmDkQdEXrl4Ur40WglcVp6ryUqcDI4+T5E4vBQP+wqrsYv/r0NWQzwuHT4BIwdHI9VW/IsVsS5YHdY2JObHaSZaW2rb+RkWpynSFb/NQZOlRG7zbJDeWmZ2Uf8j2dewjXXXdZtnGqrgZwl0FeuszZD3RuJjDbld26OQ4A/RbJKBrKoJ5K8/Uh4Ciki/nBiMu66fJhBjA76q3VGdxm5SWV9k5F4/Qm3IEoZgSQYIdxsEcaNH0EcIztj6hKpE9dtIPIgwOqLXG515GBmVggDGe78KQ4GcDUHUdwclxGDIckRSIzag/uWH0Is69bYlXSUkZLcbJIkJcKrDXOX/dZYGvWAd6RWyH4xJzMeT14wED95fTcSOIfiqN2T1UeVCxRGEcbNEucdSXWLQJzgvaiwAPx9/ghcNDyRd5Wng/pqO4pPNKC0phlNrCOc0kAc80Uxos+TgTvjSbyevjEUqYv34KFVOWY84sSsEj78puyEB785GNdOSuMd9b0VTa08bYa2klruzlN/DGwI5yBKEQG0fURwHGIM6pu7pPXZQelm3pBYpBOJNXeCnQ/LTh8aj/S1R5FTXocowv3z5MIGL9QhTarcKtpuN/fCWVi6ejHiktyHVpoBcCTDBqSbGRSSt5zmuFlTxumPykSnhmPd2k9w9//ci1t/dAtfizIM6xkZ9cDKQ2ZhyfSkDlZo3gRnLqIYLjgBuJ4LViKJXie6vfAERcFKvLqNBjgRD+pITVxZzQSgP8WoiFCLO3iZoAwu5NMQGAu/tYg5KWyz8HgBNvGc7EVvL8GyhatwvO0wrr3him6TKaJgjtPlMpEk89GnRfj3x8cQzA0aWuSuSQu9qLoRwVyMuhayE2vx3Wnp/KJOSwLZQsx+e8sxvPbJMRylX1uiZCi5azyJV3psMMZTvA6ku02iq1LnsLhSbVFQ87qVoaKPrzhE9UMLkPHkRPik8EBMGBCN6YNjiUTtCKY4etusAVh7oAyr6X5LYb+dkycJCSU2t8TPgpfGreVAaYJIdM3kVGzhnPxrcz7iufjrCIRuxEx9VEFDIPnEqsQ0yW5a64o7wh67dIiFvDzthQYXHCqpw8INR/DB3mIcqWo0cxxJJBvdh0c80aNx/vB4jpMnnHIN/OIbgykC1+PfOwpNuG4r+1ZCwnb+wBhcTLHZLCqC7viJFvzzoxys3FtkpDtBU6pYYmQABpCrTCCBOywJgePTNDl11fRXqp2MYOAGm5lD4o3+LVzyEXEi0enHubp0UAweXV0LHwpFXwgCqyda2Orc5CmTEYlkIiU5BG+cbMH3PG7GjKfzz6nKdrbHxfSXv7+AY/sP4YmXn8czq3N52mQtfcU8hpb9KSVXumxINK6ekIpFRNBXpCNTjI8hl5DupIWhgBA/SlafksKJzIbTsEZYo4aTdSlF89COBqxYtBSDRgxHcl+K+K4z0Nlj60IGufJSHmmbc8wY61a8vxLLlq2lrOGP5CEJOL431yCCSzH+1NTr44EDhTV4fulBIJIdc4fBHBsxFyFcfNIDi2ksuZQImZEg0csKHFlHfW7+P7eRQZCHEanN4FSO6gV2M6hlzRH6xf3hRU4VQFFW8OqZSCi40F+nWsKVbT02zI55Vx7G89cMJ9HIoG2jFYk05FyZlYDVByjumePItADtZNdtf9v3Ta86f4hwyHIeTa54x0WDsZtw2F5UTdGcLkC3/ess2nnhx/mREe/myUm4fHQf3uf4SR2yj1fjJy9vx6p9XAOSEgg34Ugh9fc9XDP/2lmMP18+BLdSBfGiShjH8N8fzu6Pf9NG0MQ1E0h4ixHMJeFS/0gleSiTJ15edxi/eT3bEH5DhTSHgtHRSmvuAnKQQntCBOfVMmJ1dtVcSKcuYf3zyX1HpUndaDeSShN1hyBKWgGcu9nD4vEoiVkLibBg5G5JdK/1zH51I7P2dA3kWVcXXDoVK979GHE0GLiK0aeqWsih8620kGXF9iYySbQ62dxpJxBZD8ZPpivoeAP+RT1MFsEGFvDWKLnAfzJ3AKYTcS4YnoD5n5bg5Q3Uk/fT8EJdOIJ6ny8nVwYvBYOoCFsj5+Zo2JcGtl1cR5GrvBrrHn0akdyJNGjoYCQmxSOKRwNpH7SWZO0JHhFP63spdduD+w/QLbUT6z/cgkPlxxHnG4F0h24vNYEURLWfMvlLrI3wQyq5ZZd1t3sRIZxUApmn1PE+HHcgRS5iAPvuhWxtlaRI1z/Kn+KksqinGha5nVlkJHCEgS8XhPRF62n3NoRe3uRcZLHoQyQnH2O+DsON82hg+femPKNbhkh/Zq1pMdRjuNAN0T6JHcS1Bed2SynuB5OgBlAGzqRh725ywcv+udWoFVK9Tpc4DGOoYwX41phk4in7RXG0mjHwTy3bb5A3JdzPSGBiekoEFQ9nYMAQCfaPF+2jLhyKWVwvQvyslEjclhmLv23IQ3gwKyeskiKkR6sv7aghg9iVe8K4HlOJpNKPBWbNrwdtvIKzvCDHaJEOIcFwJf6Cugm3pyQxc0icRRhY9iD3tq85VM5Yhb6023QgKzUSlxCX3t1XYpgP7eWfS+qGwFrwYv0hPCju/Ivn4pW3X0aiNzc5UNw9XdKpFaIsrUSY4xTZqmg6SPYPQyMjpmJoPdTCd+XkAoZlJW2mRXkaNhZTaK5thDetqFo7xQTuT89LxKSBsWYSwwM9MW9UH0wjpbuBiPwfWhufEyei7hImXUvKJJNENbkwIjipy45UIu/fe/Gd8SMw/upMFGVvwQt/fgZb1+5F39HpiAgPMwSmurIKpcXlKMupRAG91DGeYYjqG4phkeROnFFbt/dlgIqdrNbsX/rWHa0qh5GDFNjYBeyVpiyORJVLfMX01SrD5STa4Civq5FUMahU42B1C8/G1nG+LESYCZG1ACSUhpEFqXq12jM59ZB1iwMaBGZmg0pckFqs1rxYyGUWKC/d16cWnOp0bZB9+w+5YCotxHO5h1uId+HIBNx1NBX3vX+QlmsSEDV4iuTNiS+mLjkzIxwj+9JaJ5ZJDN2ZW4FndxYhJtgb1UQoV5BKXZIacIJE6bVPcjGxv1QDSbVemMATTP9G7meaZvetHlg2ARGurJQIvLypAEe9aIk361gdFFxJYJWZ44pwwFlPnJOMfdq/PiQ+hOtUJ6VaaVdeBf609ijmUkWRCB1HQn7R8Di8S6+BB+sVFK1+nAKedmWn+O6GwKrKBGWQ6o0bPxYj0scwDLLRBGDo/smSOlJTVYfKilpaCcNwydWzjB6dnpGBha+8jsf/9hxdRhlcNNzz60QMtFhqaaqfxvBE/8g47N7I43Q4CW1ERA9xIQJz7rAE3rJ0QgNLLvtQf19MSfaHf0UrZtPdtWJfBV6mxdHPgkjn4hPZCeei31teSxfVboyneHPDhPNwywOTMG/vNrz14it4Y9GrzBXCtx8mmT3B4elhiPaOdCAeRSH6A7un0wHcfs5vGsxy+bGnqns9HXT9cCHypiGPRKZDdA1VczFEa+WRkIpwvXHjaPxz3VEsKqghcaN9WG995JgiyU3FeRs4Zsewu1ff7ZdydPDNzOTGvNKIqmV4otgymwssmNZqGfhksDtO1xKDydmE+uBcicZl1eN81/lackEd3VOPbc3HWBoWI+hSI/5QpO2PbXknsGRvifHzi/MpdaveUZGOTRJ2ZvUJRQg5oqQRkn7q8dxEQmnDO5hbT4nAroREvTP3yfnXkmgfK6vD4ARKEyw7LDnUbEGtp/tNks7R0nretcbiQ6nghqnp5vfL245jRwVJo14gL2zn+pMVW21pu6u7ZBCI/b0sMw79Jb2wt7WUFtbvL0MOJajsvEqDwKplIglJJnXqbEYJav5shuOu3jO9Z9rvzEyEUvyyBp1BA9XU2ZPx3LML0a9fkkHsznwuFxKNRo8djukM9p8weRx3NzHYIZLcgylzxFAM4Na9e37+EAJj/bhxIrjTvaRBNRKo0dHhaPfwwXGGVEqp0YQJfzX7imGuLS9FQHikw9LNSeBDn6BgFBw6iLTkKvzowsl4fl8Z/BksIqDr5A5FG2mhiuILWH4kDJ/w0IJPXi3HJCLyZVkj8aMHsnDNd2/A0sXLsWkDxTxNGif4dO4vVsvFrt67m1Xr/kwi37u3T6AhQ+KoSlhJ3E4+3RW7C/HI2qPGKNdMghXN/i0/dgLbDpeRaCWyG/QNs6orxval+hCHI6W1yCmqwaf8bM+txNvHqAdTXI2iXsuoUqfF4NSY6Z9DGiC+HiNiiptQr8EwSjnXXJCE783oR7RjGd6uoC65VBJNJ7fRWM4mdSCWEsP75MJv0PB2y4z+JIStxmD2a4rSW+hHbSDBVltK1pf629WOuWIfk+hCs9w7pDO07u9nWWWzUL8rv6nI8Ud4HcW1uK+agS4MChps7Ak0dtK4lEIVYjPb9uPYXqfP+epJqUinm6iNxsKYEB/8kv27ckIq8oj4B6izZ+dzLoiAHxWyXerjMZSALHdUV38lELWIsbHuqYPjjHFQa0KGtuXUu1k5Rf4SzCETki48kPvaL6U4n72ihi8IsPzdzv0/6+suP7Bd1JLxxW19fP0w5/xZeOrZJ4jUfewM3b5l4WxsbEICdcmHHrsf/bmhwE72RoFgnn9120++j/SMNDzyx8fwwYbtJgqrnZxYoDDgENHgpBmxiN9a8GRI8uBzC2ET3v5oMZo9fHHdd+abg+h05Ku/vz+uu/nbjMTKw4Pv7GLeZngRCVSjiYRhWa5MxFJEksBSo8WrGebiXU9OF0XHelZKP56QOY3SQw22sl/NbU3Ef9XhPmm8ejuEkvzhliDUM6/gJ1dCemxIz4eOO+V0gxDr4MNYPenB4qrsAB6m0z+OPtURCgk10OH7n2hwiQqKxBjqUSJuCsT4eV41luzIx0MbcuFFbhpmGKa7hd2G0TSOvX7LKBKmdqMryg3VLzqIvs0Q06zQgi+WxWsbj+E/tEJHE2Y9DWKaKSV3bVhP9NfkYjjSIx8exhi6c7IoBuu88En9o3DP3P74wRva9umAnKFs7uuTm8tKXOiET7m4oknKb/fFccvpS/5Y+dsaOyU9Sh2U4MKplwv7RfC2ETmfXnEAv5o3BLE0dOmBxNpUbqxJjQrCFIrCLUS+khNN2EpD1kvrj+J1Ht8URe3J2Y8rZaqU62r+4CiOU/Ml8uKBzYfLcYBrLJqW/OU86/wmGthG0k2nLkyhlRrr88wbS+RKNWuepc4pufMDO1ek0Mqpo2bgaG4B9eKgbuKv8omb+FGczdmVayKTdE8b4KULay+uuJQWs/Dz/HnnM/RyAJ7609OMjf4nQyyTzPlT/hxVJXcR8RR1xDNsUCPSWlaontxGb+/khvthY/HCA/ejNDcPP/zFDxESGUmq3EyXUwWe+CAPi2n+l1XRg/pTKcWX4bGh+P60NKylvrFwe4G6RVk6AN+iWDc6jbHXjF/0qi7E7iWv4OlVH/OtjIcp7apdccvui0NjsPX7hoYmFO8hZWXIRUxsLApVb7fs1g/1Q9WIi5oFr0XlSIYDEyBN8nvytl28iQWiSaU/4IK57rlN+On0dOpusRTtAw31FkyUm6BEOEXsqVxkk2hNHUH97dsLd9Iw38adll3tOJoj/HkIIA8KTI5MtW85fVsLrqyWxqwNx3A7o6xk52ljf09GnJwKd13ag+AdAz8i3wFGRT2ydC8ev2409VYudY7vmkkp2MM3e/x5ZY6J7JIPtwtRu6qzrpzHIr3f9fmpfzuXNgYVZWcfRAaiKJE9+tER5FbU44bJDPXtE4546u1+3l2jVqxBEj0ISZF9MJFwziBsHlxzBDHknNKLVb/pEomDXFcxjN1XOk6L/7vbj5sjkVuIwJ/SY7CWXHhEchjLMEqOhPnytAi8RSkgNoAIbEqd45+eHNiqyApeaOcrPvtgxvnTcO8f72U8rvXSM+emDALzaNZCHDU7lDL56hTFRjsDz7gVCDg5ttMy0vDAw7/HYFq5//DrR9EY2ITI6DB8sv0AmiqLGVkVbwbvTWSsYZlY+kVf2JxL7pOOa+/9A2pKC2gVrkNVaSve2ZKLJz7JN1baOIpIAme9qC77898zUpDRkY8BmSGM9hmBcloQR8b6wqe+HCU5G7Ds4/VYvXQdsssKEOMRhcg+5ESOAA/hmpDWsk7TWMR3O1XRolhYW4NJ1NXnX3MFLvzGXIwePwqbGQ1mBus8YPZE1ssNfG/U0i0FCKQV3bYe27CTMWobEVXxtWSKZiGoCulZEqWzS2pxyys7aREOwswUEhwusIyEEGRQ5EvmvXD6tttI3PhuWFxDsU+i9V2LPkVYqNDbOZGQ8qe8AI3k9hYOcAEScWopQZRRZdlNMXHR9ny8Sf00mKK9YqKNn5JEyLFEnSs8yb2uLKZFFu1LLv4KRemhfQ7hjgsHM/iG8cDk/LfNHoBFJKySIqygkK6yzldyt1iJKgfhFekIxnHfp66SBtZcgz78WEmvxaXUQumGEyMcNj4EwfmNXUXmYMTzkkIwjoRwYFIY0gnfVEpOfegD9pcqIRGbXPrHFwzme7KrTd+jOaeCThnrHMcyMpjZKZ/rs5JceTKRVFFoVWQoOSRm1VQVw4jQOg7qGzTsvUV4W8YsofW5JzL1nkmLWJRbIuP0GVOIwDyDSrK+myRXUST6Yv3HG3FTBWNyyR076F9THXYSQlgHu7dy11Mgbvnxzeg3oB8W8F3AW9dl84Utnti5cQPGXHQD3UY+VttceoqeiSKw/rQmBysOhSGTOk1R9iF8SBFIsbsRfOZHJJdOXCRMIAd98zujkOFRhvPH3og06ro/+M3PuSkiEBteXsfwz41Ys/sQaB5BEi3jI2OGsKzl7rKO4aHLgAu7keJaLl9ypsUyLCUVky+ewXOyppoQyv6DuKuK4ZRKeslat4EadNF0eGAH+3j/m3ssP7DJx9vWI9MmV7QJjqfWztwWsPRX1F2Ly5tNHKEe9zx1X2whRee9vow2msWFcdvMfoyeijIWfOKbiXy664NDJlJLtXUlchQu/kM0gP1jdQ6HKrmGO8EIu8MU4fdS3yvksb3qVywXl/oi5O3qjXNddq1u7jnd0hCVzDjIrX7zQY6xJl80XHaUVhNieBdF6afW53brqVWKf1UX56SkuoH6JYMhOD4hUno0HdOs3CJRasWpUUdhDhW1hHV6GFUOWn05Q6qMRzU1I48GMMHC7p/GGSuiwHW9jurIuiOUAiXBMLptVFQAvkkku4lBNckMeDF6PF18FzLCbBHjwDksSyIgTbiAHpEMIr3a6qAtQzHVL97E92kzD/9rKAaR5aeXf5xLFBMZm2CMWWQMUZzXcw7sOJUIrcaVTGjltDnYuWsfkTO0hxgtq3JCvygsXrIGOYePYJQQmP9kkXRN5jRLB3LPmDsDqempFKn/jMf+9ne8+NxC/GXORbidFsGnln2KvpywE5wMLSoFxe9itNUuuhLIGqGtgv4UywScWlK7Gho5BpOKLrhkiHEzNdRFYMnGt7CeJ4C88/oibFi22UgJdCzR8suXoRHY+YeLqc9Y08kXt7AVHvrOQI2YhAgMGdgP13/nKgzhbquhw4YirV8ajW/W0T7kZ5xQqgmM6jJEyqrCMVT9sCAnTgYelZtGacKdH1guHVsUcxTuXJK6L1FPfm1fjlVJ4ZDV1fX4x/pqBkbUYvHtkzvjjyNp8NH2y0YZAe2JM6X0xxOFJxqxgAhsVp06Le7KxaywzFjCVre0+0upR3Hr9qn/doOBlVWiofH78oCI+7i5YUBCGPpRHRCcLxnTB0dIOE7QqBQltckpkVkaRNp2vMZwrShaoiVpjKY+LeIut6MiuPjVIwmxGqmajKcFuy+lFSt54lNyzgIatqJJCKTb2wRT86JrBQV5Ew7aMiqj1E6G6G57m45QPv8dN6iIiCjFy3+sH2y7nmszkEg9h0YpSQjib+wmQhljrU/PxEKsX+OXZHURET+bQS7ioFrj55ROJkKrMk2qxN6omBhcMG82lq5ZxNjosT0QWGK0F89lbkQp9JKwUQz0F8c12KVv18R74gTyEQoxfr/gHozMGo7v3/obvPLMX3HTnXdTj0jBW5vzEMlFqSglDTuek+fFj2psJbQKKJoQwgjgmVi/npaI75yXCgX4K/QxgK9qGT1+tPlcf9O1PJC+CPl5+SgpKed1AU5UnjBExnSNcNXrSeOTEhAZGYGkPkk8LysGMTTM+VAct5NgIQqrIXlyvEIMDsJ+7PSte45x81IL2SYU1n3ruXIYSzl/anxKEv8C2YDUDr0mTotU52SrnBatH4Ne0sM8sYNcuYqL395AoGfS2XQ+Z2fbqtD0Q/PDQxJISIJYofKqP6pbfTOngarYZ0mO4TpXIRrRyHlOIHJsZGimiPIDV42gX5auGao8PyR3U0inBcOuCiSsyGvwHt1OBxh5NXGAxNM2RjhF4hpG5L3KQJ8Urgv5gjUGJZWWS81LN0jgv0XLvcR1rTHtBlxPw5yi97x54qlcTQq31T5gnrwkOyLhIcmDyKz5paif5OODXBreDpNQSt3wYZ+tVqx+ilHLKHrV0EgM6SNftVxw3OpKo1cRiSWrJoQdneNTXcobkUIDWYCYDw2pFwyLw6OMjpPHQ/Ntj0XZzzidigOL15ujY9mZiZMnIhFpxicq5DSGCqdWJEYnhKRh1fLVuP7Gaw3SW+KaUybHpUFuhc4wSaSSlfqG738H/ehq+tXPfovFf/8rfnH9LSbW95GNuXRY0lprFnFnBYIGMuPDMI8+zClpwWgt+BQfv7kegfPmITk1WTWzbonx3PRApNRnUOZgRwVcDsaCbFFfAdq8nlQz4JI0Bo3V7rM1MS6ZTvJTAS1kByQ0VlC7+2xELk5sMCvWdOtQ+WIRJvkryR11SonWjromzqPFWEyD09XjkmhcETcTCnrSl96M/Fqed8381VqN3ZLmi1Z4UglPLV7WJyQ59+SmsJtbFu3wMBFyOuvsSUZCDadF+ntT08x0JpLwmmVu4NvVGy1kP0kv9Hm/yy2j47jDy4t5ZIm/fe4AbCRSHaFKEEkd24rttsoqxlliy51zM4xRyXA7rrN9hZVYSH1TiCNipbDHCtZ/gmqEYZuEOWkiPWeaf4so5Mr3z0ibyZQsA2lkNSoh81QSztJTvDQpnLd5DMyIpNtMPns5PR5fcRB/XHcMqRyvCILAojWjuWsnYXnhmhGMJqQVmuszk1bpq6jGvco4bUmYlJ3OKbnVge2azMLljyGZQzDn6mlY/NoqJFD3co3MUrRRBC2/6z/YigOfHsREcu3OhW9X5uZbOnZ7O8VREotJ0ybh32//i1sUH8Ez9/wW19x6CyZdOQAHy1tQxF0nJ4gIQaRcmsgE6jiJPs1or8jH5tfWYeHLi7C3MBtXvLcGP7vjx5g4ZaIJ51QfzDGzBKU9Fn17mfBN5w4xnxFvRCus1ah89sc5p5mVTlzvvOiWRT8iafjoxwWQTB+h3CDuktbMcR73U8nFWkHE/eGkJKPPrmKg/nYu0m0VjTx6VwuN5Tn2gRTZZoyPws/m9KchiyIfiYSMhjsZ9QNyZF9ZQkmcvpiksWocbsbs5pbdB5XQlskQsuT/eW8/hiTS6EMdUDYVa056FpZ6IU791ObjmJWZiNn0g4ubqtzCm8bQin0I/2KghOwghhoQmSbQ0HcD9/ZqE4UJY2W11UTEf6w+jCLq+gkUxRu4TisJrycuGMAYdPrd6RrKLqlHNl2VekmAGRsRfUJCIMM4WRd3Kxn5j1hYw+eb6HqU4KX936NpVJSXwCQSiiOlJ/DmrkITBFLJeZFXQUmj0wEN5Q1teC+7CFMHxWnPipFCZlOnflV+d+blajPQNYXO4s9pEVgLOzA4CPMu/QbPTX4BSV4MF+v0sVktadH7ePugjG/YXc0XZE+YPJ6U3nLJWJN0kh5xjNrloqFK9E2i1fuRJ/+Ixe+8j7/84VEGkyRyA0IWdQrqM9Q5OwgEDxpfqrNLsGHHbnz4n43IpegeQu11YNJwVFZVYStPChnBt00oHJS1GsOFgNOZ2FeLNnbeMRd2P+3v7k+dfjlVpfrtpPnSR0ncXwYPLTiJrK5J+eRqkpTz+JK9eHhVjkFSxUJfOqYvLhiZZCzn0hG1LVAitvSsUEZMaZOH9uCKinvyBM6txyrwGH2u0s0U+mcny/Jt/bbv2t92nrP5ln5oaJxTG3Z565bdVs9WZKTRRoJiRnn9lhFxz944loYfBlFISmIl8nrYhFN1SqwVFy7n+O98YxcWXDmMsc1Clg6MpWHyqevD8F+lNSinzt9CjhhKjEgiR+9jpBK1z80FJPp/+WA/nv4kj3t/rVf2SEcWMRxFSeA8Bl5cOi7FqCI1JARNXNOaKtkuIrnnWAcU2CilyMC3PjmKZxjKGU+VoIiq2+UjEikSUwriutW5GCuJiAcYwBFPbir7RQDL2MtO9WobsyLRriuowthUS+yewT5MTQnHR0cqLC5s61Isf6bplAisSgRYdWDMuNGYwON2issqedyOH83r3VvTWVfpCRlY/OZ7+M53r0dicpJKn7ofZnFb6KVLLXy/gABcwbcjZA4fQm78J75L+Ie0cofwyNlovke4iSSikboeOQ5TKHdMzRg/GRMmjsUkvjlhBHXpeL5NwbyUjG27RUY2xKY+p8SaVBmH6UXdydcglnRYLwSTwgfTR366ZEQwybQ0sJRxIUm/FwfRdj993Ce+U5nMZ+3BQjxI99GOgloTsGJbM42+zDrsFeTLus8tUcSXwsckgizJ0cRjC7a6yW5LRLR0Wd2hLk4EsCiZ8lgooCfa153Ixf0hN6E8Rn34oflZjFWWKsUHppypkddWr8WFYyjebi2sxrdf3I77LxqAS7KSGHjhyyNzfOi7jTR5u/+xjhzamVeFp1cepAsy3/h8RSYsImO1UVyjQw5p0iRB1Md9Ur8YqEHp6A3W81/0AwcSyat4OzM+2GzyV4gvIUK9twFLyF01FCk1xhCnwlYVRmUJIlx0Yoikq7Gp2rEEpNHQdgUPC/iI8fdcPuxlZxHz/Ez+nBaBLSToQN+0vph1/nQ88Ken+GLunsftSCQKDA7A+t07eMROtkFgC/m7JuZ0HbK4tghDB7Qj6vGnH8KkSePw58eeRVF5Jfx5yLtvMfVfhmpmjR2B8ygqjxqbRf9yKtu2rY6WOOwWeU/XgXN5rpXBVVxJJWg9wyBDSe1t2uaYv5PUqhnjpFK8k/tCGy/epWQR9NYujKHoLYOHkFtvnjDuD8JXJ1zo4PujWggMDnh6RwFa6OPWUTiKiTYchgRK5zltzKlwBLd4YCddWjrtQ8layCfpktNtE4lFxD9MrrKFoZvN3NKocRUqHpuL0RALjrue4uSmI+Uo4CKWpL+fPmmNxyCNU31aBXV8rjjvp7ccR38G+E/giRx6YZwikvapHHFfCKCeCvllwIuhSFtDO8gtr+3CBwx+uJjunaEUl3VckHYgSf2SSicumkcOv35/KV7aVmACSeJIcaRbij6qfaNcUIz426rDJuBiGDlxAl1z2tLpI+JL2EkdbKC6VsJx7uWRRcvIWRcS1iGEv87ZKqGqk8KgoHxy/5qmMkPYtvIk148I4zD69W0iyua6JdJbs06WcAyZfSMRyf3KmlfzeiKqhZK0PAm3M50fUzktbvQln0RBc2reiqbywsr3PsDsi+byvKxRboL8KfaQ4+zcvxm//829uOv+u1mDkOkknNCp/h6XLGMMBxQRpcN+vOZjPP7wnw2AZ8+djtGUBvRqFDveWuWt0E21pV8EDCf2i00euPOVrViw4jD30XIbGhdJOzkKIWrat9t2Jl96YifrPo1KJNcd0mU5mXKb6VQH+SIzQrn9jy6WYC4ucfYW5qsh8hZw4RyUzkYDWSgXjDhed3eUVisXojiwBQxjvJLx5ewT62L97fyYueRfL/VPS8ZRt76scVu1800BxBS7LefRW891R2uimnMUQAQUBxFcdM6ZRfmcyxAefCbDk+oto+gqK3Mao6b6Ut2Q6CyJoJ5IVcYdadvkRjMEhq4hcm9bD9V6sJNGUmWPgdx8BGEczW+dvMGquG+43YjVOXQ7mUPy2C/5aq14c6uWAMKjlR9zygfL1EmMPz0amV40c0QNXCc66VLEKpS/W9hm9zm0e3vS7zYP30Cv9qa6R84KgYsLi3D9lTdi36c5PNs5pIcxS5S0rrYBiXz372vvvkSdNtmIxeKsZ504ydLjJI4qFdANpMlMpJuni7sK0TmpWkX8GIFNmcx8mT8q+rkmdsmxdoXAW7BgeQ4Sue+3hpNodFC1r6Tm7Wv7t77t5HimBaju66di2ORaks+3QmxDi0Ifu1GBkfkjCWe5jaRrWXqv61gZnMJyKqak+i3R1zWf9fxUf6X7CsR2svrbvR6rLasxie9d0909n12HGQY75+wf7yrnXEZ16jfXAb+NhMFypZJRO2HjyELuFcqPfNvitN1juZ3rtCQVEQ7t/VXghzEyqD7NXD8pEQAAArJJREFUgoBF2OqQwQjWpebFVWkBcDRk1a05oi3KJM2FyinH6ZLGrndNq1mlZhbVOW/6dxbJQuDmhoc1DhGCUyaNSQJIHDfDz71wJlasX4bomLEmntVuV1na2KvQsGCs3/UR9u7ZZxDYWppdgz9lQ84PtRAEFMtyQpG8j+OpFmbXirJ2T9kF2YuzgoNd7sy/LVhY+TsnjBciKnJrqPnO+6ep1sCMmW381KgkCmvcUVytmmwNSG3ayKiFpMlXPiu5GzA3+HMB2k/MWrezn+W3FyUZSvGdY1JdnU076pIP1iaqZ9KWxtnBQSnCSnWpn+7L2SMwtmDjBtKoIgkbkXW7TcFGvFpwEVe0kl3W/t31LYSUSCvpJYoViTgIxkpWXRbCiivacLd6aeWRRKBdTXYL7vtu5XX9q7F7iwA7HvAINUM/XPOd5jd3ArVT3OvQqZQOp+wpSigM0k4XzfsGnrzrOWP9k/9U4lBXsjlmBDZ8/AmPqJ1Laiwace7JnqSuGroWS9e9r+bKX9Zx30B4+vnBg6uni6ycXX/shWCXEkSNvmbfcPPtWsY1i2tfTpfftbzzb1cK71rXubZ1unqd++B8rXKuZe3nrn2z77v7Vr9d++6a72T1uZY7WT7X+vT7s5Q19RF5PfxD4NFcT4sC2h9x10iPe5KjiIyxjFJKHZ2M3LzjCOLbHNp0XpPFKkzPWj1baDUOxa7tu1DDY2pCzNsFXbvco/av4Q0aSBpogGquRzsNWN1jxQUQjdn+1vCcgKSfncn1vl3Gvq+M7uqy77l73lm54+JM6lRWu017vlx/2/W6q0/P7D7Z5e389rddzvW36337ub7tZ/pWcm3D+b6e2/ldr/Vbyfm5dafrr/3M/nbNf7L7dg16ruRu/HZZO8/J8um+u7y6r8S6KW54NDUEkmUs+3+poRQLd0NMBgAAAABJRU5ErkJggg==';
	var template = '';

	//Información siniestro
        if( infoSiniestro != null ) {
            // Numero de siniestro
            var caso_n_siniestro = infoSiniestro.caso_n_siniestro != null ? infoSiniestro.caso_n_siniestro : '';
            // Id siniestro
            var caso_id = infoSiniestro.caso_id ? infoSiniestro.caso_id : '';
            // Numero de poliza
            var caso_n_poliza = infoSiniestro.caso_n_poliza != null ? infoSiniestro.caso_n_poliza : '';
            // Fecha inicio poliza
            var caso_fech_ini_poliza = fn.checkValidDate(infoSiniestro.caso_fech_ini_poliza);
            caso_fech_ini_poliza = caso_fech_ini_poliza ? caso_fech_ini_poliza : '';
            // Causas
            var causas = infoSiniestro.causas ? infoSiniestro.causas : '';
            // Fecha fin poliza
            var caso_fech_fin_poliza = infoSiniestro.caso_fech_fin_poliza ? infoSiniestro.caso_fech_fin_poliza : '';
            // Cia de seguros
            var cia_seg = infoSiniestro.cia_seg ? infoSiniestro.cia_seg : '';
            // Ajustador
            var corredores = infoSiniestro.corredores ? infoSiniestro.corredores : '';
            // Asegurados
            var asegurados = infoSiniestro.asegurados ? infoSiniestro.asegurados : '';
            // Dirección
            var caso_direccion = infoSiniestro.caso_direccion ? infoSiniestro.caso_direccion : '';
            // Estado
            var regiones = infoSiniestro.regiones ? infoSiniestro.regiones : '';
            // Municipio
            var comunas = infoSiniestro.comunas ? infoSiniestro.comunas : '';
            // Fecha de siniestro
            var caso_fech_ocurren = fn.checkValidDate(infoSiniestro.caso_fech_ocurren);
            caso_fech_ocurren = caso_fech_ocurren ? caso_fech_ocurren : '';
            // Nombre Asegurado
            var beneficiarios = infoSiniestro.beneficiarios ? infoSiniestro.beneficiarios : '';
        } else {
            var caso_n_siniestro = '';
            var caso_id = '';
            var caso_n_poliza = '';
            var caso_fech_ini_poliza = '';
            var causas = '';
            var caso_fech_fin_poliza = '';
            var cia_seg = '';
            var corredores = '';
            var asegurados = '';
            var caso_direccion = '';
            var regiones = '';
            var comunas = '';
            var caso_fech_ocurren = '';
            var beneficiarios = '';
        }
		
	// Datos inspeccion
		// Persona de contacto
        if(infoInspeccion != null ) {
            var inspeccion_contacto = infoInspeccion.inspeccion_contacto ? infoInspeccion.inspeccion_contacto : '';
            // Contacto
            var inspeccion_mail = infoInspeccion.inspeccion_mail ? infoInspeccion.inspeccion_mail : '';
            // Declaracion
            var inspeccion_declaracion = infoInspeccion.inspeccion_declaracion ? infoInspeccion.inspeccion_declaracion : '';
            // Descripcion
            var inspeccion_descrip = infoInspeccion.inspeccion_descrip ? infoInspeccion.inspeccion_descrip : '';
            // Alcance de daños
            var inspeccion_dano_estr = infoInspeccion.inspeccion_dano_estr ? infoInspeccion.inspeccion_dano_estr : '';
            // Presupuesto
            var inspeccion_almacen = infoInspeccion.inspeccion_almacen ? infoInspeccion.inspeccion_almacen : '';
    
			// Fecha inspeccion realizada
			var inspeccion_fecha_realizada = fn.checkValidDate(infoInspeccion.inspeccion_fecha_realizada);
			if (inspeccion_fecha_realizada == null)
				inspeccion_fecha_realizada = fn.checkValidDate(infoInspeccion.dateInspeccion);
        } else {
            var inspeccion_contacto = '';
            var inspeccion_mail = '';
            var inspeccion_declaracion = '';
            var inspeccion_descrip = '';
            var inspeccion_dano_estr = '';
            var inspeccion_almacen = '';
            var inspeccion_fecha_realizada = '';
        }
		

    //Información usuario
        //Nombre del usuario
        if( infoUsuario != null) {
            var user_nombre = infoUsuario.user_nombre ? infoUsuario.user_nombre : '';
            var user_fono = infoUsuario.user_fono ? infoUsuario.user_fono : '';
            var user_celular = infoUsuario.user_celular ? infoUsuario.user_celular : '';
            var user_mail = infoUsuario.user_mail ? infoUsuario.user_mail : '';
        } else {
            var user_nombre = '';
            var user_fono = '';
            var user_celular = '';
            var user_mail = '';
        }

	//Cabecero
		//Style
	template += '<style>' +
		'h1 {' +
		'color: #042657;' +
		'font-size: 22pt;' +
		'}' +
		'span {' +
		'color: #006600;' +
		'font-style: italic;' +
		'font-size: 14pt;' +
		'}' +
		'</style>';
	template += '<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td width="50%">&nbsp;</td>' +
		'<td width="50%" rowspan="2" align="right"><img src="data:image/png;base64, ' + logo + '" width="164" height="50" /></td>' +
		'</tr>' +
		'<tr>' +
		'<td><h1>Acta de Inspección</h1></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td><br /><br /> <span>Datos Generales</span></td>' +
		'<td align="right"></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'</table>';
	//Membrete
	template += '<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td width="20%">N° Siniestro:</td>' +
		'<td width="30%">' + caso_n_siniestro + '</td>' +
		'<td width="20%">N° Caso:</td>' +
		'<td width="30%">' + caso_id + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>N° Póliza:</td>' +
		'<td>' + caso_n_poliza + '</td>' +
		'<td>Inicio Póliza:</td>' +
		'<td>' + caso_fech_ini_poliza + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Causa:</td>' +
		'<td>' + causas + '</td>' +
		'<td>Termino Póliza:</td>' +
		'<td>' + caso_fech_fin_poliza + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Cía. de Seguros:</td>' +
		'<td colspan="3" align="left">' + cia_seg + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Corredor:</td>' +
		'<td colspan="3" align="left">' + corredores + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Nombre Asegurado:</td>' +
		'<td colspan="3" align="left">' + asegurados + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Giro Asegurado:</td>' +
		'<td colspan="3" align="left"></td>' //TODO: Falta giro asegurado
		+
		'</tr>' +
		'<tr>' +
		'<td>Nombre Afectado:</td>' +
		'<td colspan="3" align="left">' + beneficiarios + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Dirección Siniestro:</td>' +
		'<td colspan="3" align="left">' + caso_direccion + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Estado:</td>' +
		'<td align="left">' + regiones + '</td>' +
		'<td>Municipio:</td>' +
		'<td>' + comunas + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Fecha de Siniestro:</td>' +
		'<td align="left">' + caso_fech_ocurren + '</td>' +
		'<td>Fecha Inspección:</td>' +
		'<td>' + inspeccion_fecha_realizada + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Atendido Por:</td>' +
		'<td align="left">' + inspeccion_contacto + '</td>' +
		'<td>Datos de Contacto:</td>' +
		'<td align="left">' + inspeccion_mail + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="left"><strong>Declaración del Asegurado:</strong></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="justify">' + inspeccion_declaracion + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="left"><strong>Descripción del Lugar del Siniestro:</strong></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="justify">' + inspeccion_descrip + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="left"><strong>Alcance de Daños:</strong></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="justify">' + inspeccion_dano_estr + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="left"><strong>Presupuesto:</strong></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="4" align="justify">' + inspeccion_almacen + '</td>' +
		'</tr>' +
		'</table>';
	// Salto de pagina
	template += '<p style="page-break-before: always">';

	// Contacto
	//Style
	template += '<style>' +
		'h1 {' +
		'color: #042657;' +
		'font-size: 22pt;' +
		'}' +
		'span {' +
		'color: #006600;' +
		'font-style: italic;' +
		'font-size: 14pt;' +
		'}' +
		'</style>';
	template += '<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td colspan="2"><br /><br /> <span>Contacto R&G Espinosa</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2">_____________________________________________________________________________________________</td>' +
		'</tr>' +
		'</table> '

		+
		'<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td width="20%">Nombre del Ajustador:</td>' +
		'<td colspan="3" align="left">' + user_nombre + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td width="20%">Compañía de Ajuste:</td>' +
		'<td width="30%"><strong>R&G Espinosa</strong></td>' +
		'<td width="20%">Teléfonos de Contacto:</td>' +
		'<td width="30%">' + user_fono + ' / ' + user_celular + ' </td>' +
		'</tr>' +
		'<tr>' +
		'<td>Correo de contacto:</td>' +
		'<td colspan="3" align="left"> ' + user_mail +  '</td>' +
		'</tr>' +
		'</table>'

		+
		'<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'

		+
		'<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td width="35%">______________________________</td>' +
		'<td width="30%">&nbsp;</td>' +
		'<td width="35%">______________________________</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Inspector:</td>' +
		'<td>&nbsp;</td>' +
		'<td>Asegurado:</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + user_nombre + '</td>' +
		'<td>&nbsp;</td>' +
		'<td>' + asegurados + '</td>' +
		'</tr>' +
		'</table>';

	//Salto de página
	template += '<p style="page-break-before: always">';

	// Fotografias
	//Style
	template += '<style>' +
		'h1 {' +
		'color: #042657;' +
		'font-size: 22pt;' +
		'}' +
		'span {' +
		'color: #006600;' +
		'font-style: italic;' +
		'font-size: 14pt;' +
		'}' +
		'</style>';
	template += '<table width="100%" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'<td colspan="2"><br /><br /> <span>Fotografías</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="2">_______________________________________________________________________________________________</td>' +
		'</tr>' +
		'</table>'
	if (listFotos != null) { // Se imprime la lista de fotos
		var espacio = '<br/><br/>';
		var rowCount = 0;
		console.error('lista fotos', listFotos);
		for (var i = 0; i < listFotos.length; i = i + 2) {
			if (listFotos[i] == null) {
				continue;
			}
			if(rowCount == 3) {
                //Salto de página
                template += '<p style="page-break-before: always">';
                template += espacio + espacio;
                rowCount = 0;
            }
            template += '<table width="100%" border="0" cellspacing="0" cellpadding="5">';
            template += '<tr>';
            // Elemento 1
            template += '<td width="50%" align="center"><img src="' + listFotos[i].up_documento + '" width="280" height="210"/>' + '<br/>';
            var nombreFoto1;
            if(listFotos[i].tipo_foto_nombre){
                nombreFoto1 = listFotos[i].tipo_foto_nombre;
            } else {
                nombreFoto1 = listFotos[i].nombre_foto;
            }
            template += nombreFoto1 + '<br/>' + 'Fecha: ' + listFotos[i].fecha_ingreso + espacio + '</td>';
            // Elemento 2
            if(listFotos[i + 1]){
                template += '<td width="50%" align="center"><img src="' + listFotos[i + 1].up_documento + '" width="280" height="210"/>' + '<br/>';
                var nombreFoto2;
                if(listFotos[i + 1].tipo_foto_nombre){
                    nombreFoto2 = listFotos[i + 1].tipo_foto_nombre;
                } else {
                    nombreFoto2 = listFotos[i + 1].nombre_foto;
                }
                template += nombreFoto2 + '<br/>' + 'Fecha: ' + listFotos[i + 1].fecha_ingreso + espacio + '</td>';
            } else{
                template += '<td width="50%" align="center"><div src="" width="280" height="210"></div>' + '<br/>';
                template +=  espacio + '</td>';
            }
            template += '</tr>';
            template += '</table>';
            
            rowCount++;
		}
	}

	return template;
}

function getDataSiniestro(callback) {
	var idSiniestro = window.localStorage.getItem('idSiniestroServidor');
	sqlQuery('SELECT * FROM Siniestro WHERE caso_id = ?', [idSiniestro], function (dataSiniestro) {
		var infoSiniestro;
		if (dataSiniestro != true) {
			infoSiniestro = dataSiniestro[0];
		} else {
			infoSiniestro = null;
		}
		callback(infoSiniestro);
	});
}

function getDataInspeccion(callback) {
	var idInspeccion = window.localStorage.getItem('inspeccion_id');
	sqlQuery('SELECT * FROM DetalleInspeccion WHERE idInspeccion = ?', [idInspeccion], function (dataDetalleInspeccion) {
		var detalleInspeccion;
		if (dataDetalleInspeccion != true) {
			detalleInspeccion = dataDetalleInspeccion[0];
		} else {
			detalleInspeccion = null;
		}
		callback(detalleInspeccion);
	})
}

function getFotosInspeccion(callback) {
	var idSiniestro = window.localStorage.getItem('idSiniestroServidor');
	if (device.platform == 'iOS') { // En iOS se utiliza el base64
		sqlPromise(`SELECT * FROM FotoInspeccion WHERE edita_dato = ?`, [idSiniestro])
			.then(rowsAsList)
			.then(callback);
	} else { // Android tiene problemas con el base64
		sqlPromise(`SELECT idFoto, fotos_id, fotos_nombre, fotos_observaciones, 
				up_documento, edita_dato, fecha_ingreso, 
				cantidadFotosPlus, nombre_foto, tipo_foto_nombre  
			FROM FotoInspeccion WHERE edita_dato = ?`, [idSiniestro])
			.then(rowsAsList)
			.then(callback)
	}
}

/**
 * Función que guarda un base64 a un pdf
 * @param {*} folderpath 
 * @param {*} filename 
 * @param {*} content 
 * @param {*} contentType 
 */
function savebase64AsPDF(folderpath, filename, content, contentType) {
	// Convert the base64 string in a Blob
	var DataBlob = b64toBlob(content, contentType);
	window.resolveLocalFileSystemURL(folderpath, function (dir) {
		dir.getFile(filename, {
			create: true
		}, function (file) {
			file.createWriter(function (fileWriter) {
				fileWriter.onwriteend = function () {
					showSuccess("Se ha generado el documento " + file.name);
					abrirDocumentoConAplicacionDeTerceros(file.nativeURL, 'application/pdf');
				}
				fileWriter.write(DataBlob);
			}, function () {
				showError('Unable to save file in path ' + folderpath);
			});
		});
	});
}