import { Autocomplete, MenuItem, TextField } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';

const PassengerInfo = ({ passenger, setPassenger, autoValue }) => {
  return (
    <section>
      <form className='passengerForm'>
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nombre-required'
          placeholder='Nombre'
          value={passenger.firstName}
          onChange={(e) =>
            setPassenger({ ...passenger, firstName: e.target.value })
          }
          className='passengerInput'
          margin='dense'
        />

        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Apellido-required'
          placeholder=' Primer Apellido'
          value={passenger.lastname}
          onChange={(e) =>
            setPassenger({ ...passenger, lastname: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='Apellido2-required'
          placeholder=' Segundo Apellido'
          value={passenger.lastname2}
          onChange={(e) =>
            setPassenger({ ...passenger, lastname2: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='birthdate'
          placeholder='Fecha Nacimiento'
          type='date'
          value={passenger.birthdate}
          onChange={(e) =>
            setPassenger({ ...passenger, birthdate: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='Nacimiento-required'
          placeholder='Lugar de nacimiento'
          value={passenger.birthPlace}
          onChange={(e) =>
            setPassenger({ ...passenger, birthPlace: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='document'
          select
          label='Tipo de Documento'
          value={passenger.typedocument}
          onChange={(e) =>
            setPassenger({ ...passenger, typedocument: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        >
          {autoValue.documentation.map((option) => (
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
          placeholder='Nº Documento'
          value={passenger.documentFlight}
          onChange={(e) =>
            setPassenger({ ...passenger, documentFlight: e.target.value })
          }
          margin='dense'
          className='passenger-input'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='inssuancedate'
          label='Fecha de expedición'
          type='date'
          value={passenger.inssuanceDate}
          onChange={(e) =>
            setPassenger({ ...passenger, inssuanceDate: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          required
          id='expiredate'
          label='Fecha de expiración'
          type='date'
          value={passenger.expireDate}
          onChange={(e) =>
            setPassenger({ ...passenger, expireDate: e.target.value })
          }
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
          value={passenger.inssuancePlace}
          onChange={(e) =>
            setPassenger({ ...passenger, expireDate: e.target.value })
          }
        />
        <TextField
          sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
          id='gender'
          select
          placeholder='Género'
          value={passenger.gender}
          onChange={(e) =>
            setPassenger({ ...passenger, gender: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        >
          {autoValue.gender.map((option) => (
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
          value={passenger.email}
          onChange={(e) =>
            setPassenger({ ...passenger, email: e.target.value })
          }
          className='passenger-input'
          margin='dense'
        />
        {
          <Autocomplete
            id='pais'
            options={autoValue.countries}
            sx={{ width: 300 }}
            onChange={(e, newinputvalue) => autoValue.setCountry(newinputvalue)}
            value={autoValue.country.label}
            renderInput={(params) => <TextField {...params} label='Pais' />}
          ></Autocomplete>
        }
        {
          <TextField
            id='typephone'
            select
            label='Tipo de Teléfono'
            value={passenger.TypePhone}
            onChange={(e) =>
              setPassenger({ ...passenger, TypePhone: e.target.value })
            }
          >
            {autoValue.typePhone.map((option) => (
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
            onChange={(e) =>
              setPassenger({ ...passenger, phone: e.target.value })
            }
            value={passenger.phone}
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
