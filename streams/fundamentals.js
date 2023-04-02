// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        
        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 500)
    }
}


class InverseNumbeStreamr extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}


class MultiplyByTen extends Writable {
    _write(chunck, encoding, callback) {
        console.log(Number(chunck.toString()) * 10);
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumbeStreamr())
    .pipe(new MultiplyByTen())


