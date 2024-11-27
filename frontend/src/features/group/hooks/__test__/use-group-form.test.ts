import { renderHook, act } from '@testing-library/react';
import { useGroupForm } from '../use-group-form';

describe('useGroupForm', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  afterAll(() => {
    (global.URL.createObjectURL as jest.Mock).mockReset();
    (global.URL.revokeObjectURL as jest.Mock).mockReset();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGroupForm());

    expect(result.current.form.getValues()).toEqual({
      name: '',
      description: '',
    });
    expect(result.current.selectedImageUrl).toBe('');
  });

  it('should initialize with provided values', () => {
    const initialValues = {
      name: 'Test Group',
      description: 'Test Description',
      avatar: 'test-avatar.jpg',
    };

    const { result } = renderHook(() => useGroupForm(initialValues));

    expect(result.current.form.getValues()).toEqual({
      name: 'Test Group',
      description: 'Test Description',
    });
    expect(result.current.selectedImageUrl).toBe('test-avatar.jpg');
  });

  it('should handle file selection', () => {
    const { result } = renderHook(() => useGroupForm());
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.handleFileChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.getValues('avatar')).toBe(file);
    expect(result.current.selectedImageUrl).toBe('mocked-url');
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('should handle media removal', () => {
    const { result } = renderHook(() => useGroupForm());
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.handleFileChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleRemoveMedia();
    });

    expect(result.current.form.getValues('avatar')).toBeNull();
    expect(result.current.selectedImageUrl).toBe('');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mocked-url');
  });

  it('should create FormData with correct values', () => {
    const { result } = renderHook(() => useGroupForm());
    const values = {
      name: 'Test Group',
      description: 'Test Description',
      avatar: new File([''], 'test.jpg', { type: 'image/jpeg' }),
    };

    const formData = result.current.getFormData(values);

    expect(formData.get('name')).toBe('Test Group');
    expect(formData.get('description')).toBe('Test Description');
    expect(formData.get('avatar')).toBeInstanceOf(File);
  });
});
