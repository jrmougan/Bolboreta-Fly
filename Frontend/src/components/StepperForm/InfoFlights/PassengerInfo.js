import { Autocomplete, MenuItem, TextField } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';

const PassengerInfo = ({
  /*   handleSubmit,
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
  counter, */

  params,
}) => {
  return (
    <section>
      <form className='passengerForm'>
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nombre-required'
          placeholder='Nombre'
          value={params.name}
          onChange={params.handleSubmit(params.setName)}
          className='passengerInput'
          margin='dense'
        />

        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Apellido-required'
          placeholder=' Primer Apellido'
          value={params.lastname}
          onChange={params.handleSubmit(params.setLastname)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='Apellido2-required'
          placeholder=' Segundo Apellido'
          value={params.lastname2}
          onChange={params.handleSubmit(params.setName)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='birthdate'
          placeholder='Fecha Nacimiento'
          type='date'
          value={params.birthdate}
          onChange={params.handleSubmit(params.setBirhdate)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nacimiento-required'
          placeholder='Lugar de nacimiento'
          value={params.birthPlace}
          onChange={params.handleSubmit(params.setBirthplace)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='document'
          select
          label='Tipo de Documento'
          value={params.typedocument}
          onChange={params.handleSubmit(params.setTypeDocument)}
          className='passenger-input'
          margin='dense'
        >
          {params.documentation.map((option) => (
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
          value={params.documentFlight}
          onChange={params.handleSubmit(params.setDocumentFlight)}
          margin='dense'
          className='passenger-input'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='inssuancedate'
          label='Fecha de expedición'
          type='date'
          value={params.inssuanceDate}
          onChange={params.handleSubmit(params.setInssuancedate)}
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='expiredate'
          label='Fecha de expiración'
          type='date'
          value={params.expiredate}
          onChange={params.handleSubmit(params.setExpiredate)}
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
          value={params.genero}
          onChange={params.handleSubmit(params.setGenero)}
          className='passenger-input'
          margin='dense'
        >
          {params.gender.map((option) => (
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
          value={params.email}
          onChange={params.handleSubmit(params.setEmail)}
          className='passenger-input'
          margin='dense'
        />
        {
          <Autocomplete
            id='pais'
            options={params.countries}
            sx={{ width: 300 }}
            onChange={(e, newinputvalue) => params.setPais(newinputvalue)}
            value={params.pais.label}
            renderInput={(params) => <TextField {...params} label='Pais' />}
          ></Autocomplete>
        }
        {
          <TextField
            id='typephone'
            select
            label='Tipo de Teléfono'
            value={params.TypePhone}
            onChange={params.handleSubmit(params.setTypePhone)}
          >
            {params.typePhone.map((option) => (
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
            onChange={params.handleSubmit(params.setPhone)}
            value={params.phone}
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
