// create several data set for testing the body-parser internal methods

const type = 'text/plain'

const txt1 = Buffer.from('Just some text whatever')
const txt2 = Buffer.from('Just some other text whatever')
const txt3 = Buffer.from('Just some other text again')

export const data1 = [
  {name: 'input1', data: Buffer.from('some value')},
  {
    name: 'fileKey',
    filename: 'somefile.txt',
    type,
    data: txt1
  }
]

export const data2 = [
  { name: 'input2', data: Buffer.from('some value 2')},
  {
    name: 'fileData[]',
    filename: 'file1.txt',
    type,
    data: txt1
  },
  {
    name: 'fileData[]',
    filename: 'file2.txt',
    type,
    data: txt2
  },
]

export const data3 = [
  { name: 'input3', data: Buffer.from('some value 3')},
  {
    name: 'file1[]',
    filename: 'file1.txt',
    type,
    data: txt1
  },
  {
    name: 'file2[]',
    filename: 'file2.txt',
    type,
    data: txt2
  },
  {
    name: 'file2[]',
    filename: 'file3.txt',
    type,
    data: txt3
  }
]
