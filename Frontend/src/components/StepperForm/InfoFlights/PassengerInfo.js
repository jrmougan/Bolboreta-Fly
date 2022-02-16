import { Autocomplete, MenuItem, TextField } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';

const PassengerInfo = ({
  handleSubmit,
  name,
  setName,
  lastname,
  setLastname,
  lastname2,
  setLastname2,
  birthdate,
  setBirhdate,
  birthPlace,
  setBirthplace,
  typedocument,
  setTypeDocument,
  documentation,
  documentFlight,
  setDocumentFlight,
  inssuanceDate,
  setInssuancedate,
  expiredate,
  setExpiredate,
  genero,
  setGenero,
  gender,
  email,
  setEmail,
  countries,
  setPais,
  pais,
  typePhone,
  setTypePhone,
  TypePhone,
  phone,
  setPhone,
}) => {
  return (
    <section>
      <h3> Pasajero 1 </h3>
      <form className='passengerForm'>
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nombre-required'
          placeholder='Nombre'
          value={name}
          onChange={handleSubmit(setName)}
          className='passengerInput'
          margin='dense'
        />

        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Apellido-required'
          placeholder=' Primer Apellido'
          value={lastname}
          onChange={handleSubmit(setLastname)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='Apellido2-required'
          placeholder=' Segundo Apellido'
          value={lastname2}
          onChange={handleSubmit(setName)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='birthdate'
          placeholder='Fecha Nacimiento'
          type='date'
          value={birthdate}
          onChange={handleSubmit(setBirhdate)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nacimiento-required'
          placeholder='Lugar de nacimiento'
          value={birthPlace}
          onChange={handleSubmit(setBirthplace)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='document'
          select
          label='Tipo de Documento'
          value={typedocument}
          onChange={handleSubmit(setTypeDocument)}
          className='passenger-input'
          margin='dense'
        >
          {documentation.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {' '}
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Dni'
          placeholder='DNI /  NIE'
          value={documentFlight}
          onChange={handleSubmit(setDocumentFlight)}
          margin='dense'
          className='passenger-input'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='inssuancedate'
          label='Fecha de expedición'
          type='date'
          value={inssuanceDate}
          onChange={handleSubmit(setInssuancedate)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='expiredate'
          label='Fecha de expiración'
          type='date'
          value={expiredate}
          onChange={handleSubmit(setExpiredate)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='issuancecountry'
          placeholder='Lugar de Expedicion'
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='gender'
          select
          placeholder='Genero'
          value={genero}
          onChange={handleSubmit(setGenero)}
          className='passenger-input'
          margin='dense'
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {' '}
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='email'
          label='E-mail'
          type='email'
          value={email}
          onChange={handleSubmit(setEmail)}
          className='passenger-input'
          margin='dense'
        />
        {
          <Autocomplete
            id='pais'
            options={countries}
            sx={{ width: 300 }}
            onChange={(e, newinputvalue) => setPais(newinputvalue)}
            value={pais.label}
            renderInput={(params) => <TextField {...params} label='Pais' />}
          ></Autocomplete>
        }
        {
          <TextField
            id='typephone'
            select
            label='Tipo de Teléfono'
            value={TypePhone}
            onChange={handleSubmit(setTypePhone)}
          >
            {typePhone.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {' '}
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
        {
          <MuiPhoneNumber
            defaultCountry={'es'}
            onChange={handleSubmit(setPhone)}
            value={phone}
          />
        }
        <button className='enviardatos' type='submit'>
          {' '}
          Guardar pasajeros{' '}
        </button>
      </form>
    </section>
  );
};
export default PassengerInfo;
