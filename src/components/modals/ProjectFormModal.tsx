import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Project, User } from '../../types/types'
import { useDispatch } from 'react-redux'
import { addProject, editProject } from '../../redux/slices/projectsSlice'

type ProjectFormModalProps = {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  users: User[]
}

export default function ProjectFormModal({ isOpen, onClose, project, users }: ProjectFormModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: {
      name: project ? project.name : '',
      description: project ? project.description : '',
      owner: project ? project.owner.toString() : '',
    },
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (project) {
      reset({
        id: project.id,
        name: project.name,
        description: project.description,
        owner: project?.owner?.toString(),
      })
    }
  }, [project, reset])

  const onSubmit: SubmitHandler<Project> = (data) => {
    const projectData = {
      id: data.id === '0' ? Date.now().toString() : data.id,
      name: data.name,
      description: data.description,
      owner: data.owner,
    }
    dispatch(project?.id ? editProject(projectData) : addProject(projectData))
    reset({
      id: '0',
      name: '',
      description: '',
      owner: '',
    })
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>{project ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => <TextField {...field} fullWidth margin="normal" label="Name" variant="outlined" error={!!errors.name} helperText={errors.name ? errors.name.message : ''} />}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                fullWidth
                maxRows={3}
                margin="normal"
                label="Description"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
            )}
          />
          <Controller
            name="owner"
            control={control}
            rules={{ required: 'Owner is required' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select {...field} labelId="owner-label" label="Owner" error={!!errors.owner}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {users?.map((user) => {
                    return (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    )
                  })}
                </Select>
                {errors.owner && <span style={{ color: 'red', fontSize: '12px' }}>{errors.owner.message}</span>}
              </FormControl>
            )}
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
