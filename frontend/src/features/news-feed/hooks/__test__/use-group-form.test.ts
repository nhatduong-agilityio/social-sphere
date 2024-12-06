import { renderHook, act } from '@testing-library/react';
import { useGroupForm } from '../use-group-form';

describe('useGroupForm', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'mock-url');
    URL.revokeObjectURL = jest.fn();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useGroupForm());

    expect(result.current.form.getValues()).toEqual({
      name: '',
      description: '',
    });
    expect(result.current.selectedImageUrl).toBe('');
  });

  it('handles file changes correctly', () => {
    const { result } = renderHook(() => useGroupForm());
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

    act(() => {
      result.current.handleFileChange({
        target: { files: [mockFile] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedImageUrl).toBe('mock-url');
    expect(result.current.form.getValues('avatar')).toBe(mockFile);
  });

  it('handles media removal correctly', () => {
    const { result } = renderHook(() => useGroupForm());

    act(() => {
      result.current.handleFileChange({
        target: { files: [new File(['test'], 'test.png')] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleRemoveMedia();
    });

    expect(result.current.selectedImageUrl).toBe('');
    expect(result.current.form.getValues('avatar')).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('generates correct FormData', () => {
    const { result } = renderHook(() => useGroupForm());
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockValues = {
      name: 'Test Group',
      description: 'Test Description',
      avatar: mockFile,
    };

    const formData = result.current.getFormData(mockValues);

    expect(formData.get('name')).toBe('Test Group');
    expect(formData.get('description')).toBe('Test Description');
    expect(formData.get('avatar')).toBe(mockFile);
  });
});
