import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "./CourseCard";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id'>) => void;
  course?: Course | null;
  mode: 'add' | 'edit';
}

export const CourseFormModal = ({
  isOpen,
  onClose,
  onSave,
  course,
  mode
}: CourseFormModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    pageRange: '',
    progress: 0,
    status: 'pending' as Course['status'],
    description: ''
  });

  useEffect(() => {
    if (course && mode === 'edit') {
      setFormData({
        title: course.title,
        pageRange: course.pageRange,
        progress: course.progress,
        status: course.status,
        description: course.description
      });
    } else {
      setFormData({
        title: '',
        pageRange: '',
        progress: 0,
        status: 'pending',
        description: ''
      });
    }
  }, [course, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({
      title: '',
      pageRange: '',
      progress: 0,
      status: 'pending',
      description: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Course' : 'Edit Course'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageRange">Page Range</Label>
            <Input
              id="pageRange"
              value={formData.pageRange}
              onChange={(e) => setFormData({ ...formData, pageRange: e.target.value })}
              placeholder="e.g., 5-6 or 10"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Course['status']) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter course description"
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Course' : 'Update Course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};